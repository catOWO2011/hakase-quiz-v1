import { HomeFilled } from "@ant-design/icons";
import { Button, Form, Input, Menu, Modal } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createQuiz } from "../features/collection/collectionSlice";

const Header = () => {
  const onMenuClick = (e) => {
    const { key } = e;
    if (key == "new-quiz") {
      showModal();
    }
  };

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNewQuiz = async () => {
    const newQuizzProperties = form.getFieldsValue();
    const { id: quizId } = await dispatch(createQuiz(newQuizzProperties));
    setIsModalOpen(false);
    form.resetFields();
    navigate(`/edit-quizz/${quizId}`);
  };

  return (
    <div className="h-[60px]">
      {
        isModalOpen && 
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={handleSubmitNewQuiz}>
              Submit
            </Button>,
          ]}
        >
          <Form form={form}>
            <Form.Item label="Quiz Name" name="title">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      }
      <Menu
        mode="horizontal"
        onClick={onMenuClick}
        items={[
          {
            label: <Link to={'/'}><HomeFilled /></Link>,
            key: "home",
          },
          {
            label: "Create a new quiz",
            key: "new-quiz",
          },
        ]}
      />
    </div>
  );
};

export default Header;
