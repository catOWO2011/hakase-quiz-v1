import { DeleteTwoTone, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { questionConstants } from "../constants/question";

const PLACEHOLDER_FILL_BLANK = "Write the text to fill";
const PLACEHOLDER_FILL_TEXT = "Write the text ouside the blank";
const BLANK_TYPE = "blank";
const TEXT_TYPE = "text";

const InputOption = ({ inputText, type, removeOption, handleEditOption }) => {
  const [inputValue, setInputValue] = useState(inputText ?? '');
  const [inputWidth, setInputWidth] = useState(100);
  const hiddenSpan = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (hiddenSpan.current) {
      let newWidth = hiddenSpan.current.offsetWidth;
      if (newWidth === 0) {
        newWidth += 250;
      } else {
        newWidth += 70;
      }
      setInputWidth(newWidth);
    }
  }, [inputValue]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    setInputValue(value)
    handleEditOption({ [name]: value });
  };

  return (
    <div
      className="flex relative"
    >
      <Input
        name="optionText"
        className={`${type === BLANK_TYPE ? 'border-2 border-[#BB9AB1]' : 'border-0'} p-2`}
        value={inputValue}
        placeholder={type === BLANK_TYPE ? PLACEHOLDER_FILL_BLANK : PLACEHOLDER_FILL_TEXT}
        onChange={handleInputChange}
        style={{
          width: `${inputWidth}px`
        }}
        ref={inputRef}
        required
      />
      <span
        ref={hiddenSpan}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          whiteSpace: 'pre'
        }}
      >
        {inputValue}
      </span>
      <Button
        className="flex items-center absolute right-1 bg-[#FEFBD8] top-1"
        onClick={removeOption}
      >
        <DeleteTwoTone />
      </Button>
    </div>
  );
};

const OptionInputCollection = ({ _, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (options.some(({ type }) => type === BLANK_TYPE) && options.some(({ type }) => type === TEXT_TYPE)) {
      onChange(JSON.stringify(options));
    } else {
      onChange('');
    }
  }, [onChange, options]);

  const handleRemoveInputOption = (key) => {
    return () => {
      setOptions(options.filter(({ id }) => id !== key));
    };
  };

  const handleEditOption = (key) => {
    return (newProps) => {
      const idxOption = options.findIndex(({ id }) => id === key);
      options[idxOption] = { ...options[idxOption], ...newProps };
      setOptions([...options]);
    };
  };

  const handleAddInputOption = (type) => {
    return () => {
      setOptions([
        ...options,
        {
          id: crypto.randomUUID(),
          isCorrect: type === BLANK_TYPE,
          optionText: "",
          type
        }
      ]);
    };
  };

  return (
    <div>
      <div
        className="flex float-end gap-2 pb-2"
      >
        <Button className="flex items-center" onClick={handleAddInputOption(BLANK_TYPE)}>
          <PlusCircleOutlined /> Insert Blank
        </Button>
        <Button className="flex items-center" onClick={handleAddInputOption(TEXT_TYPE)}>
          <PlusCircleOutlined /> Insert Text
        </Button>
      </div>
      <ul
        className="w-full flex items-start gap-3 flex-wrap"
      >
        {
          options.map(({ id, ...otherProps }) =>
            <li key={id}>
              <InputOption
                {...otherProps}
                removeOption={handleRemoveInputOption(id)}
                handleEditOption={handleEditOption(id)}
              />
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default function FillBlankCreator() {
  return (
    <>
      <Form.Item
        hidden={true}
        name="type"
        initialValue={questionConstants.FILL_IN_THE_BLANKS}
      />
      <Form.Item
        name="options"
        rules={[
          {
            required: true,
            message: "Add at least one text and one blank element."
          }
        ]}
      >
        <OptionInputCollection />
      </Form.Item>
    </>
  );
}
