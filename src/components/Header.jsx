import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createCompleteQuiz, createQuiz } from "../features/collection/quizzesSlice";
import { questionConstantsText, questionIcons } from "../constants/question";
import styled, { keyframes } from "styled-components";
import { Cookies } from "react-cookie";
import { RiStickyNoteAddFill } from "react-icons/ri";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

const HeaderButton = ({ children, action }) => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        className="rounded-md bg-[#ffe6e6] px-3 py-2 text-sm font-medium text-[#ad88c6]"
        onClick={action}
      >
        {children}
      </button>
    </div>
  );
};

const fadeInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const StyledDDTooogle = styled.button`
  padding: 0 13px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.4s;
  outline: none;
  animation: ${fadeInFromTop} 0.5s;

  &:hover,
  &:focus {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const StyledHeader = styled.header`
  background-image: linear-gradient(to bottom right, #f55fa7 0%, #f7e151 100%);
  display: flex;
  height: 50px;

  button:nth-of-type(2) {
    margin-left: auto;
  }

  button:nth-of-type(2) {
    display: flex;
    align-items: center;
  }
`;

const cookies = new Cookies();

const Header = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonQuestions, setJsonQuestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userCookie = cookies.get("user");

  const onMenuClick = () => {
    showModal();
  };

  const onSignOutClick = () => {
    cookies.remove("user");
    navigate("/auth");
  };

  const onClickDashboard = () => {
    navigate('/');
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNewQuiz = async () => {
    const newQuizzProperties = form.getFieldsValue();
    const quizId = await dispatch(createCompleteQuiz({
      newQuizzProperties,
      questions: jsonQuestions
    })).unwrap();
    setIsModalOpen(false);
    form.resetFields();
    navigate(`/quizzes/${quizId}/edit`);
  };

  const props = {
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setJsonQuestions(content);
        } catch (err) {
          console.error("Invalid JSON ");
        }
      };
      reader.readAsText(file);
      return false;
    },
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={handleSubmitNewQuiz}>
              Submit
            </Button>
          ]}
        >
          <Form form={form} className="mt-8">
            <Form.Item label="Quiz Name" name="title">
              <Input />
            </Form.Item>
          </Form>
          <>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag a JSON file with questions</p>
            <p className="ant-upload-hint">
              
            </p>
          </Dragger></>
        </Modal>
      )}
      <StyledHeader>
        {userCookie && (
          <>
            <StyledDDTooogle onClick={onClickDashboard}>Dashboard</StyledDDTooogle>
            <StyledDDTooogle onClick={onMenuClick}>
              <RiStickyNoteAddFill size={25} />
              <span>Create a new Quiz</span>
            </StyledDDTooogle>
            <StyledDDTooogle onClick={onSignOutClick}>Logout</StyledDDTooogle>
          </>
        )}
      </StyledHeader>
    </>
  );
};

export default Header;
