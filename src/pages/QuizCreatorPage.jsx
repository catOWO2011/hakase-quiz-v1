import { Button, Dropdown, Form, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react'
import FillBlankCreator from '../components/FillBlankCreator';
import { PlusOutlined } from '@ant-design/icons';

const FILL_IN_THE_BLANKS = 'Fill in the blanks';

// The palete being used is https://colorhunt.co/palette/00a9ff89cff3a0e9ffcdf5fd
// https://colorhunt.co/palette/756ab6ac87c5e0aed0ffe5e5
// Desings https://dribbble.com/shots/20566500-Coding-Quiz-UI-for-Geecko-Skills

// Panel
// https://dribbble.com/shots/21163408-Wayyy-Questions-list

function QuizCreatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionText, setQuestionText] = useState('');
  
  const handleOk = () => {
    // Create question with correctAnswer and questionText
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setQuestionTitle("");
    setModalContent(null);
  };
  
  const handleAddQuestion = (questionType) => {
    return () => {
      setIsModalOpen(true);
      setQuestionTitle(questionType);
      switch (questionType) {
        case FILL_IN_THE_BLANKS:
          setModalContent(
            <FillBlankCreator 
              setCorrectAnswer={setCorrectAnswer} 
              setQuestionText={setQuestionText}
            />
          )
          break;
      }
    };
  };

  const items = [
    {
      key: '1',
      label: (
        <button
          onClick={handleAddQuestion(FILL_IN_THE_BLANKS)}
          className=''
        >
          Fill in the blank
        </button>
      )
    }
  ];

  return (
    <Content>
      { isModalOpen && <Modal
        title={questionTitle}
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
        {
          modalContent
        }
      </Modal>}
      <div className='flex flex-col'>
        <div>
          <Dropdown
            menu={{items}}
            className=''
            overlayStyle={{
              
            }}
          >
            <Button
              icon={<PlusOutlined />}
              type='primary'
            >
              Question
            </Button>
          </Dropdown>
        </div>
      </div>
      <div>

      </div>
    </Content>
  );
}

export default QuizCreatorPage