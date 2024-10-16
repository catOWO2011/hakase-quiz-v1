import { Flex, Form, Input, Select } from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { materialDark } from '@uiw/codemirror-theme-material';

import MarkdownInput from "./MarkdownInput";
import { questionConstantsText } from "../constants/question";
import { EXTENSIONS, Languages } from "../constants/codeMirror";

const CodeInput = ({ onChange, optionId, initialOption = {
  optionText: '',
  language: Languages.JAVASCRIPT
} }) => {
  const [value, setValue] = useState(initialOption.optionText);
  const [language, setLanguage] = useState(initialOption.language);

  const onChangeCode = useCallback((val) => {
    setValue(val);
    onChange(JSON.stringify([{
      id: optionId,
      isCorrect: true,
      optionText: val,
      language: language
    }]));
  }, [onChange, optionId, language]);

  const handleOnChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div>
      <Flex wrap gap="small">
        <Select 
          defaultValue={language}
          onChange={handleOnChangeLanguage}
          style={{
            width: 120,
          }}
          options={[
            {
              value: Languages.JAVASCRIPT,
              label: Languages.JAVASCRIPT
            },
            {
              value: Languages.JAVA,
              label: Languages.JAVA
            },
            {
              value: Languages.POSTGRESQL,
              label: Languages.POSTGRESQL
            },
            {
              value: Languages.PYTHON,
              label: Languages.PYTHON
            }
          ]}
        />
      </Flex>
      <ReactCodeMirror
        onChange={onChangeCode}
        value={value}
        height="200px"
        // theme={materialDark}
        extensions={[EXTENSIONS[language]]}
        basicSetup={{
          autocompletion: true
        }}
      />
    </div>
  ); 
};

export default function CodeAnswer({ question }) {
  const options = JSON.parse(question.options);
  const codeOptions = {
    optionId: crypto.randomUUID()
  };
  if (options.length) {
    codeOptions.initialOption = options[0];
  }

  return (
    <>
      <Form.Item
        name="type"
        hidden={true}
        initialValue={questionConstantsText.CODE_ANSWER}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="text"
        initialValue={question.text ? question.text : ''}
        rules={[
          {
            required: true,
            message: 'A question is required.'
          }
        ]}
      >
        <MarkdownInput initialValue={question.text} />
      </Form.Item>
      <Form.Item
        name="options"
        rules={[
          {
            required: true
          }
        ]}
        initialValue={question.options || ""}
      >
        <CodeInput
          {...codeOptions}
        />
      </Form.Item>
    </>
  );
};
