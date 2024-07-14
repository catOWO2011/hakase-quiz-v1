import React, { useState } from 'react';
import { Input, Form, Button, Checkbox, Alert } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const Option = ({ handleEditOption, optionText, handleDeleteOption, handleUpdateOptions }) => {

  const handleOnCheck = ({ target: { name, checked } }) => {
    handleEditOption()[name] = checked;
    handleUpdateOptions();
  };

  const handleTextChange = ({target: { name, value }}) => {
    handleEditOption()[name] = value;
    handleUpdateOptions();
  };

  return (
    <div className='flex align-middle justify-between mt-3 mb-3'>
      <Checkbox
        name='isCorrect' defaultValue={false} onChange={handleOnCheck}
      />
      <Input
        className='ml-2 mr-2'
        name='optionText' defaultValue={optionText} onChange={handleTextChange}
      />
      <Button
        className='inline-flex items-center'
        onClick={handleDeleteOption}
      >
        <DeleteTwoTone />
      </Button>
    </div>
  );
};

const OptionCollectionInput = ({ _, onChange }) => {
  const [options, setOptions] = useState([]);

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

  const handleEditOption = (optionId) => {
    return () => {
      const option = options.find(({id}) =>  id === optionId);
      return option;
    };
  };

  const handleDeleteOption = (optionId) => {
    return () => {
      const remainOptions = options.filter(({id}) => id !== optionId);
      setOptions(remainOptions);
      if (remainOptions.length < 2) {
        onChange('');
      } else {
        onChange(JSON.stringify(remainOptions));
      }
    };
  };

  const handleUpdateOptions = () => {
    if (options.length > 1) {
      onChange(JSON.stringify(options));
    } else {
      onChange('');
    }
  };

  return (
    <div>
      <ul>
        {
          options.map(
            ({ id, ...otherProps }) => 
              <li key={id}>
                <Option
                  {...otherProps}
                  handleEditOption={handleEditOption(id)}
                  handleDeleteOption={handleDeleteOption(id)}
                  handleUpdateOptions={handleUpdateOptions}
                />
              </li>
          )
        }
      </ul>
      <Button onClick={handleAddOption}>Add Options</Button>
    </div>
  );
};

const MultipleResponseCreator = () => {
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
            message: 'At least two options are required'
          }
        ]}
      >
        <OptionCollectionInput />
      </Form.Item>
    </>
  );
};

export default MultipleResponseCreator;