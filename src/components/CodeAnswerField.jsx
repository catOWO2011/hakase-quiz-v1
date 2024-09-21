import ReactCodeMirror from "@uiw/react-codemirror";
import { Form } from "antd";
import { useCallback, useState } from "react";
import { EXTENSIONS } from "../constants/codeMirror";

const CodeInputField = ({ onChange, option }) => {
  const [value, setValue] = useState('');

  const onChangeCode = useCallback((val) => {
    setValue(val);
    onChange({
      [option.id]: val
    });
  }, [onChange, option]);

  return (
    <div className="flex-auto w-full">
      <ReactCodeMirror
        onChange={onChangeCode}
        value={value}
        height="200px"
        extensions={[EXTENSIONS[option.language]]}
        basicSetup={{
          autocompletion: true
        }}
      />
    </div>
  );
};

export default function CodeAnswerField({ question }) {
  const options = JSON.parse(question.options);

  return (
    <>
      <Form.Item
        name="answers"
        className="w-full"
        initialValue={{}}
      >
        <CodeInputField option={options[0]}/>
      </Form.Item>
    </>
  );
};