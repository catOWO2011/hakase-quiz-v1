import { useState } from 'react';
import { Input, Form, Button, Checkbox, Alert } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { questionConstantsText } from '../constants/question';
import MarkdownInput from './MarkdownInput';

const Option = ({ optionRef, optionText, handleDeleteOption, handleUpdateOptions, isCorrect }) => {

  const handleOnCheck = ({ target: { name, checked } }) => {
    optionRef[name] = checked;
    handleUpdateOptions();
  };

  const handleTextChange = (newValue) => {
    optionRef['optionText'] = newValue,
    handleUpdateOptions();
  };

  return (
    <div className='flex items-center justify-between mt-3 mb-3'>
      <Checkbox
        name='isCorrect'
        defaultValue={false}
        onChange={handleOnCheck}
        checked={isCorrect}
      />
      <div
        className='w-full mx-4'
      >
        <MarkdownInput
          initialValue={optionText}
          onChange={handleTextChange}
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

const OptionCollectionInput = ({ _, onChange, initialOptions }) => {
  const [options, setOptions] = useState(initialOptions);

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

  const getOptionRef = (optionId) => {
    return options.find(({id}) =>  id === optionId);
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
                  optionRef={getOptionRef(id)}
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

const MultipleResponseCreator = ({ question }) => {
  const [text, setText] = useState(question.text);

  return (
    <>
      <Form.Item
        name="type"
        hidden={true}
        initialValue={questionConstantsText.MULTIPLE_RESPONSE}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="text"
        initialValue={text}
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
            message: 'At least two options are required and one needs to be true.'
          }
        ]}
      >
        <OptionCollectionInput initialOptions={JSON.parse(question.options)}/>
      </Form.Item>
    </>
  );
};

export default MultipleResponseCreator;