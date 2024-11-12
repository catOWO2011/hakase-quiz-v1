import { Checkbox, Col, Form, Row, Space } from "antd";
import React, { useState } from "react";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import styled from "styled-components";
import ROMarkdown from "./ROMarkdown";

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    display: none;
  }
  width: 100%;
  .ant-checkbox + span {
    width: 100%;
  }
`;

const OptionCollectionInput = ({ onChange, options }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleOnCheckOption = (selectedIds) => {
    const newAnswers = {};
    for (const selectedId of selectedIds) {
      newAnswers[selectedId] = options.find(
        ({ id }) => id === selectedId
      ).optionText;
    }
    onChange(newAnswers);
    setSelectedIds([...selectedIds]);
  };

  return (
    <div>
      <Space direction="vertical" className="w-full">
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={handleOnCheckOption}
        >
          <Row gutter={[8, 8]}>
            {options.map(({ id, optionText }) => (
              <Col span={24} key={id} >
                <StyledCheckbox value={id} name="isCorrect">
                  <div className="flex items-center justify-center">
                    <div>
                      {!selectedIds.includes(id) && (
                        <RiCheckboxBlankLine
                          className="cursor-pointer"
                          size={25}
                          color="#E5D9F2"
                          style={{
                            color: `#E5D9F2`,
                            backgroundColor: '#FFF'
                          }}
                        />
                      )}
                      {selectedIds.includes(id) && (
                        <RiCheckboxFill
                          size={25}
                          className="cursor-pointer"
                          color="#A594F9"
                          style={{
                            color: `#A594F9`,
                            backgroundColor: '#FFF'
                          }}
                        />
                      )}
                    </div>
                    <div
                      className={`m-2 w-full hover:border-[#A594F9] hover:border-2 ${
                        selectedIds.includes(id) ? "rounded-md border-2 border-[#A594F9]" : "rounded-md border-2 border-[#F5EFFF]"
                      }`}
                    >
                      <ROMarkdown
                        text={optionText}
                        id={id}
                      />
                    </div>
                  </div>
                </StyledCheckbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Space>
    </div>
  );
};

export default function MultipleResponseField({ question }) {
  const options = JSON.parse(question.options);

  return (
    <Form.Item name="answers"
      initialValue={{}}
      className="w-full"
    >
      <OptionCollectionInput options={options} />
    </Form.Item>
  );
}
