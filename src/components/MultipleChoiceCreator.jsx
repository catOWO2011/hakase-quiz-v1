import { DeleteTwoTone } from "@ant-design/icons";
import { Alert, Button, Form, Input, Table, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useRef, useState } from "react";

import { QuestionDataContext } from "../pages/QuizCreatorPage";
import { data } from "autoprefixer";

const EditableContext = React.createContext(null);

export default function MultipleChoiceCreator() {
  const [questionText, setQuestionText] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [formQuestion] = useForm();
  const questionData = useContext(QuestionDataContext);

  const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props}/>
        </EditableContext.Provider>
      </Form>
    );
  };

  const handleDelete = (key) => {
    setCorrectAnswers(correctAnswers.filter(answerKey => answerKey !== key));
    setDataSource(dataSource.filter(item => item.key !== key));
  };

  const handleEditQuestionText = ({ target: { value: text }}) => {
    setQuestionText(text);
    questionData.text = text;
  };

  useEffect(() => {
    questionData.options = dataSource;
  }, [dataSource]);

  useEffect(() => {
    if (questionText.length > 0 && dataSource.length > 0 && correctAnswers.length > 0) {
      questionData.putReady(true);
    } else {
      questionData.putReady(false);
    }
  }, [questionText, dataSource, correctAnswers]);

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    };
    
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values
        });
      } catch (error) {
        console.error('Save failed: ', error);
      }
    };

    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>
  };

  const rowSelection = {
    onChange: (_, selectedRows) => {
      questionData.correctAnswers = selectedRows.map(({ key }) => key);
      setCorrectAnswers([...questionData.correctAnswers]);
    },
    getCheckboxProps: (record) => ({
      name: record.name
    })
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
  };

  const handleAddOption = () => {
    
    const newOption = {
      key: crypto.randomUUID(),
      choice: 'new choice'
    };

    setDataSource([...dataSource, newOption]);
  };

  const defaultColumns = [
    {
      title: 'Choice',
      dataIndex: 'choice',
      editable: true
    },
    {
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) => dataSource.length > 0 ?
        (<button
            className={`
              items-center
              inline-flex
            `}
            onClick={() => handleDelete(record.key)}
          >
          <DeleteTwoTone />
        </button>) : null
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      })
    };
  });

  return (
    <>
      <Typography.Title level={5}>Question</Typography.Title>
      <div>
        <Form
          form={formQuestion}
          initialValues={{question: 'Write your question here...'}}
        >
          <Form.Item
            name={'question'}
            rules={[
              {
                required: true,
                message: 'A question is required.'
              }
            ]}
          >
            <TextArea
              value={questionText}
              onChange={handleEditQuestionText}
              autoSize={{
                minRows: 2
              }}
            />
          </Form.Item>
          <Form.Item
          >
            <Typography.Title level={5}>Choices</Typography.Title>
            <div>
              { 
                (dataSource.length === 0 || correctAnswers.length === 0)
                &&
                <Alert 
                  message="Add at least one choice and select the one that's going to be the correct answer."
                  type="info"
                  showIcon 
                />
              }
            </div>
            {
              <div className="pt-2">
                <Button
                  onClick={handleAddOption}
                  style={{
                    marginBottom: 16
                  }}
                >
                  Add a choice
                </Button>
                <Table
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection
                  }}
                  components={components}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
              </div>
            }
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
