import { DeleteTwoTone } from "@ant-design/icons";
import { Alert, Button, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { questionConstantsText } from "../constants/question";

const Option = ({ optionText, handleDelete, handleEditOption, isCorrect, id }) => {

  const handleEditText = ({ target: { name, value }}) => {
    handleEditOption({ [name]: value });
  };

  return (
    <div className="flex items-center justify-between mt-3 mb-3">
      <Radio
        name="isCorrect"
        value={id}
        checked={isCorrect}
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

const OptionCollectionInput = ({ _, onChange, initialOptions }) => {
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    if (options.some(({isCorrect}) => isCorrect === true) && options.some(({isCorrect}) => isCorrect === false)) {
      onChange(JSON.stringify(options));
    } else {
      onChange('');
    }
  }, [onChange, options]);

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

  const selectedOption = options.find(({isCorrect}) => isCorrect);

  return (
    <div>
      <ul>
        <Radio.Group className="w-full" name="isCorrect" onChange={handleOnChangeRadioGroup}
          value={selectedOption ? selectedOption.id : ''}
        >
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

export default function MultipleChoiceCreator({ question }) {
  const [text, setText] = useState(question.text);

  return (
    <>
      <Form.Item
        name="type"
        hidden={true}
        initialValue={questionConstantsText.MULTIPLE_CHOICE}
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
        initialValue={text}
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
        <OptionCollectionInput initialOptions={JSON.parse(question.options)}/>
      </Form.Item>
    </>
  );
}
