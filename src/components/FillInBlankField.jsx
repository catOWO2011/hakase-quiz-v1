import { Form, Input } from "antd";
import { useEffect, useState } from "react";

const InputFieldOption = ({ inputWidth, handleOnChangeAnswerInput }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    handleOnChangeAnswerInput(value);
    setInputValue(value);
  };

  return (
    <div>
      <Input
        name="optionText"
        value={inputValue}
        onChange={handleInputChange}
        className="text-2xl"
        style={{
          width: `${inputWidth*1.2}px`
        }}
      />
    </div>
  );
};

const OptionInputCollection = ({_, onChange, initialOptions }) => {
  const [answers, setAnswers] = useState(initialOptions.filter(({isCorrect}) => isCorrect === true).reduce((prev, { id }) => ({ ...prev, [id]: '' }), {}));

  useEffect(() => {
    onChange(answers);
  }, [answers, onChange]);

  const handleOnChangeAnswerInput = (id) => {
    return (newText) => setAnswers(prevAnswer => ({
        ...prevAnswer,
        [id]: newText
      }
    ));
  };

  return (
    <>
      <ul
        className="w-full flex items-start gap-3 flex-wrap text-2xl font-semibold"
      >
        {
          initialOptions.map(({ id, optionText, isCorrect, inputWidth }) => {
            if (isCorrect) {
              return (
                <li key={id}>
                  <InputFieldOption
                    inputWidth={inputWidth}
                    handleOnChangeAnswerInput={handleOnChangeAnswerInput(id)}
                  />
                </li>
              );
            } else {
              return (
                <li key={id}>
                  <div className="leading-[42px]">
                    <span>{optionText}</span>
                  </div>
                </li>
              );
            }
          })
        }
      </ul>
    </>
  );
};

export default function FillInBlankField({ question }) {
  const options = JSON.parse(question.options);

  return (
    <Form.Item
      name="answers"
      initialValue={{}}
    >
      <OptionInputCollection initialOptions={ options }/>
    </Form.Item>
  );
};
