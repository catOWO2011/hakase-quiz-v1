import { Form, Radio, Space } from "antd";
import { useRef, useState } from "react";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import styled from "styled-components";

const RadioOption = ({ className, children, checked, optionText, ...props }) => {
  const radioRef = useRef(null);

  return (
    <Radio {...props} className={className} ref={radioRef} >
        <div className="flex items-center justify-center">
          <div>
            { checked === false && <RiCheckboxBlankCircleLine
              className="cursor-pointer"
              size={35}
              color="#7469b6"
            /> }
            { checked === true && <RiCheckboxCircleFill
              size={35}
              className="cursor-pointer"
              color="#7469b6"
            /> }
          </div>
          <div className={`ml-4 p-4 ${checked ? 'rounded-md border-2 border-[#7469b6]' : ''}`}>
            <div className="text-base font-semibold">{optionText}</div>
          </div>
        </div>
      </Radio>
  );
};

const OptionCollectionInput = ({_, onChange, options, value }) => {
  const [answers, setAnswers] =  useState({});
  const defaultSelectedId = Object.keys(answers).length > 0 ? Object.keys(answers)[0] : '';

  const handleOnClickOption = ({ target: { value } }) => {
    const text = options.find(({id}) => id === value).optionText;
    const selectedId = Object.keys(answers).length > 0 ? Object.keys(answers)[0] : '';
    if (selectedId !== value) {
      setAnswers({
        [value]: text
      });
      onChange({
        [value]: text
      });
    }
  };

  return (
    <Radio.Group value={defaultSelectedId} onChange={handleOnClickOption}>
        <Space direction="vertical">
          {
            options.map(({id, optionText}) => (
              <StyledRadio
                key={id}
                value={id}
                checked={defaultSelectedId === id}
                optionText={optionText}
              />
            ))
          }
        </Space>
      </Radio.Group>
  );
};

const StyledRadio = styled(RadioOption)`
  .ant-radio {
    display: none;
  }
`;

export default function MultipleChoiceField({ question }) {
  const options = JSON.parse(question.options);

  return (
    <Form.Item
      name='answers'
    >
      <OptionCollectionInput options={options}/>
    </Form.Item>
  );
}
