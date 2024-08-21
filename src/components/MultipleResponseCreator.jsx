import { useState } from 'react';
import { Input, Form, Button, Checkbox, Alert } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { questionConstants } from '../constants/question';

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
    <div className='flex items-center justify-between mt-3 mb-3'>
      <Checkbox
        name='isCorrect' defaultValue={false} onChange={handleOnCheck}
      />
      <div
        className='w-full mx-4'
      >
        <Input
          className='ml-2 mr-2'
          name='optionText'
          defaultValue={optionText}
          onChange={handleTextChange}
          required
        />
      </div>
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
      if (remainOptions.length > 1 && remainOptions.some(({isCorrect}) => isCorrect === true)) {
        onChange(JSON.stringify(remainOptions));
      } else {
        onChange('');
      }
    };
  };

  const handleUpdateOptions = () => {
    if (options.length > 1 && options.some(({isCorrect}) => isCorrect === true)) {
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
        name="type"
        hidden={true}
        initialValue={questionConstants.MULTIPLE_RESPONSE}
      >
        <Input />
      </Form.Item>
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
};

export default MultipleResponseCreator;