import { Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";

const InputFieldOption = ({ text, handleOnChangeAnswerInput }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState(100);
  const measureRef = useRef(null);

  const handleInputChange = ({ target: { value } }) => {
    handleOnChangeAnswerInput(value);
    setInputValue(value);
  };

  useEffect(() => {
    if (measureRef.current) {
      let newWidth = measureRef.current.offsetWidth;
      if (newWidth === 0) {
        newWidth += 150;
      } else {
        newWidth += 30;
      }
      setInputWidth(newWidth);
    }
  }, []);

  return (
    <div>
      <Input
        name="optionText"
        value={inputValue}
        onChange={handleInputChange}
        className="text-2xl"
        style={{
          width: `${inputWidth}px`,
          fontFamily: 'Quicksand, sans-serif'
        }}
      />
      <span 
        ref={measureRef}
        className="invisible fixed whitespace-pre"
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          padding: '0',
        }}
      >
        {text}
      </span>
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
                    text={optionText}
                    handleOnChangeAnswerInput={handleOnChangeAnswerInput(id)}
                  />
                </li>
              );
            } else {
              return (
                <li key={id}>
                  <div className="leading-[42px]">
                    <span style={{
                      fontFamily: 'Quicksand, sans-serif',
                      color: '#8094ab'
                    }}>{optionText}</span>
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
