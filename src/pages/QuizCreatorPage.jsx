import { Button, Form, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react'
import FillBlankCreator from '../components/FillBlankCreator';

// The palete being used is https://colorhunt.co/palette/00a9ff89cff3a0e9ffcdf5fd

function QuizCreatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  const handleOk = () => {

  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  
  const handleAddQuestion = () => {
    setIsModalOpen(true);
  };

  return (
    <Content>
      <Modal
        title="New Question"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {/* <Form form={form} layout="vertical">
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please enter a question' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your question" />
          </Form.Item>
        </Form> */}
        <FillBlankCreator />
      </Modal>
      <div>
        <Button className='' onClick={handleAddQuestion}>Fill in the blank</Button>
      </div>
      <div>

      </div>
    </Content>
  );
}

export default QuizCreatorPage