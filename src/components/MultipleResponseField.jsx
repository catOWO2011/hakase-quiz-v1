import { Checkbox, Col, Form, Row, Space } from "antd";
import React from "react";

const OptionCollectionInput = ({ onChange, options }) => {

  const handleOnCheckOption = (selectedIds) => {
    const newAnswers = {};
    for (const selectedId of selectedIds) {
      newAnswers[selectedId] = options.find(({id}) => id === selectedId).optionText;
    }
    onChange(newAnswers);
  };

  return (
    <div>
      <Space direction="vertical">
        <Checkbox.Group style={{ width: "100%" }} onChange={handleOnCheckOption}>
          <Row gutter={[8,8]}>
            {options.map(({ id, optionText }) => (
              <Col span={24} key={id}>
                <Checkbox value={id} name="isCorrect">
                  <div>
                    <span className="text-base font-semibold">
                      {optionText}
                    </span>
                  </div>
                </Checkbox>
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
    <Form.Item name="answers">
      <OptionCollectionInput options={options} />
    </Form.Item>
  );
};
