import { Checkbox, Col, Form, Row, Space } from "antd";
import React, { useState } from "react";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import Markdown from "react-markdown";
import styled from "styled-components";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const StyledCheckbox = styled(Checkbox)`
.ant-checkbox-inner {
  display: none;
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
      <Space direction="vertical">
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={handleOnCheckOption}
        >
          <Row gutter={[8, 8]}>
            {options.map(({ id, optionText }) => (
              <Col span={24} key={id}>
                <StyledCheckbox value={id} name="isCorrect">
                  <div className="flex items-center justify-center">
                    <div>
                      {!selectedIds.includes(id) && (
                        <RiCheckboxBlankLine
                          className="cursor-pointer"
                          size={35}
                          color="#7469b6"
                        />
                      )}
                      {selectedIds.includes(id) && (
                        <RiCheckboxFill
                          size={35}
                          className="cursor-pointer"
                          color="#7469b6"
                        />
                      )}
                    </div>
                    <div
                      className={`ml-4 p-4 ${
                        selectedIds.includes(id) ? "rounded-md border-2 border-[#7469b6]" : ""
                      }`}
                    >
                      <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                        { optionText }
                      </Markdown>
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
    >
      <OptionCollectionInput options={options} />
    </Form.Item>
  );
}
