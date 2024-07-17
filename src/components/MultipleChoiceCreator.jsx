import { DeleteTwoTone } from "@ant-design/icons";
import { Alert, Button, Form, Input, Radio, Table, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";

const Option = ({ optionText, handleDelete, handleEditOption, id }) => {

  const handleEditText = ({ target: { name, value }}) => {
    handleEditOption({ [name]: value });
  };

  return (
    <div className="flex items-center justify-between mt-3 mb-3">
      <Radio
        name="isCorrect"
        value={id}
      />
      <div
        className="w-full"
      >
        <Input
          className="mx-2"
          name="optionText"
          defaultValue={optionText}
          onChange={handleEditText}
          required
        />
      </div>
      <Button
        className="inline-flex items-center"
        onClick={handleDelete}
      >
        <DeleteTwoTone />
      </Button>
    </div>
  );
};

const OptionCollectionInput = ({ _, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // console.log(options);
    if (options.some(({isCorrect}) => isCorrect === true) && options.some(({isCorrect}) => isCorrect === false)) {
      onChange(JSON.stringify(options));
    } else {
      onChange('');
    }
  }, [options]);

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: crypto.randomUUID(),
        isCorrect: false,
        optionText: "New Option"
      }
    ]);
  };

  const handleDeleteOption = (key) => {
    return () => {
      setOptions(options.filter(({id}) => id !== key));
    };
  };

  const handleEditOption = (key) => {
    return ({ newProps }) => {
      const oldOptionIdx = options.findIndex(({id}) => key === id);
      options[oldOptionIdx] = {
        ...options[oldOptionIdx],
        ...newProps
      };
      setOptions([...options]);
    };
  };

  const handleOnChangeRadioGroup = ({ target: { name, checked, value: key } }) => {
    setOptions(options.map(option => {
      if (option.id === key) {
        return {
          ...option,
          [name]: checked
        }
      } else {
        return {
          ...option,
          [name]: false
        }
      }
    }));
  };

  return (
    <div>
      <ul>
        <Radio.Group className="w-full" name="isCorrect" onChange={handleOnChangeRadioGroup}>
          {
            options.map(
              ({ id, ...otherProps }) => 
                <li key={id}>
                  <Option
                    id={id}
                    {...otherProps}
                    handleDelete={handleDeleteOption(id)}
                    handleEditOption={handleEditOption(id)}
                  />
                </li>
            )
          }
        </Radio.Group>
      </ul>
      <Button onClick={handleAddOption}>Add Options</Button>
    </div>
  );
};

export default function MultipleChoiceCreator() {
  const [text, setText] = useState('');

  return (
    <>
      <Form.Item
        name="text"
        rules={[
          {
            required: true,
            message: 'A question is required.'
          }
        ]}
      >
        <TextArea
          value={text}
          onChange={({target: { value }}) => setText(value)}
          autoSize={{
            minRows: 2
          }}
          placeholder='Write your question here.'
        />
      </Form.Item>
      <Alert
        message="Add at least one choice and select the one that's going to be the correct answer."
        type="info"
        className='mb-2'
        showIcon 
      />
      <Form.Item
        name="options"
        rules={[
          {
            required: true,
            message: 'At least two options are required and it one needs to be true.'
          }
        ]}
      >
        <OptionCollectionInput />
      </Form.Item>
    </>
  );
}
