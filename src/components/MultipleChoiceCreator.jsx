import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Table, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useRef, useState } from "react";

const EditableContext = React.createContext(null);

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
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    name: record.name
  })
};

export default function MultipleChoiceCreator({ setCorrectAnswer, setQuestionText }) {
  const [question, setQuestion] = useState('Write your question...');
  const [dataSource, setDataSource] = useState([]);
  const [formQuestion] = useForm();

  const handleDelete = (key) => setDataSource(
    dataSource.filter(item => item.key !== key)
  );

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

  const handleAdd = () => {
    const count = dataSource.length;
    const newData = {
      key: crypto.randomUUID(),
      choice: 'new choice'
    };
    setDataSource([...dataSource, newData]);
  };

  const defaultColumns = [
    {
      title: 'Choice',
      dataIndex: 'choice',
      editable: true
    },
    {
      title: 'Operation',
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
        <Form form={formQuestion}>
          <Form.Item
            name={'question'}
            initialValue={'Write your question here...'}
            rules={[
              {
                required: true,
                message: 'A question is required.'
              }
            ]}
          >
            <TextArea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Write your question"
              autoSize={{
                minRows: 2
              }}
              required={true}
            />
          </Form.Item>
        </Form>
      </div>
      <Typography.Title level={5}>Choices</Typography.Title>
      <div>
        <Button
        onClick={handleAdd}
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
    </>
  );
}
