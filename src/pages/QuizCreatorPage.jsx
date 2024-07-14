import { Button, Dropdown, Form, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

import { useDispatch } from 'react-redux';
import { addQuestion } from '../features/question/questionsSlice';
import FillBlankCreator from '../components/FillBlankCreator';
import MultipleChoiceCreator from '../components/MultipleChoiceCreator';
import MultipleResponseCreator from '../components/MultipleResponseCreator';

const FILL_IN_THE_BLANKS = 'Fill in the blanks';
const MULTIPLE_CHOICE = 'Multiple choice';
const MULTIPLE_RESPONSE = 'Multiple response';

// The palete being used is https://colorhunt.co/palette/00a9ff89cff3a0e9ffcdf5fd
// https://colorhunt.co/palette/756ab6ac87c5e0aed0ffe5e5
// Desings https://dribbble.com/shots/20566500-Coding-Quiz-UI-for-Geecko-Skills

// Panel
// https://dribbble.com/shots/21163408-Wayyy-Questions-list

export const QuestionDataContext = React.createContext(null);

let questionInfo = {
  text: '',
  correctAnswers: [],
  options: []
};

function QuizCreatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [questionReady, setQuestionReady] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  questionInfo.putReady = setQuestionReady

  useEffect(() => {
    setQuestionReady(false);
  }, []);
  
  const handleOk = async () => {
    // Create question with correctAnswer and questionText
    console.log(questionInfo);
    console.log('correctAnswer', correctAnswer);
    console.log('question text', questionText);
    const { text, correctAnswers, options } = questionInfo;
    await dispatch(addQuestion({
      text,
      options,
      correctAnswers
    }));
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setQuestionTitle("");
    setModalContent(null);
  };
  
  const handleAddQuestion = (questionType) => {
    return () => {
      questionInfo = {
        text: '',
        correctAnswers: [],
        options: []
      };

      setIsModalOpen(true);
      setQuestionTitle(questionType);

      switch (questionType) {
        case FILL_IN_THE_BLANKS:
          setModalContent(
            <FillBlankCreator 
              setCorrectAnswer={setCorrectAnswer} 
              setQuestionText={setQuestionText}
            />
          );
          break;
        case MULTIPLE_CHOICE:
          setModalContent(
            <MultipleChoiceCreator />
          );
          break;
        case MULTIPLE_RESPONSE:
          setModalContent(
            <MultipleResponseCreator />
          );
          break
      }
    };
  };

  const onFinish = (values) => {
    console.log(`Form values`, JSON.parse(values['options']));
    setIsModalOpen(false);
  };

  const dropdownItems = [
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
    },
    {
      key: '2',
      label: (
        <button
          onClick={handleAddQuestion(MULTIPLE_CHOICE)}
          className=''
        >
          Multiple Choice
        </button>
      )
    },
    {
      key: '3',
      label: (
        <button
          onClick={handleAddQuestion(MULTIPLE_RESPONSE)}
        >
          {MULTIPLE_RESPONSE}
        </button>
      )
    }
  ];

  return (
    <Content>
      { isModalOpen &&
        <Modal
          title={questionTitle}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            onFinish={onFinish}
          >
            { modalContent }
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        // <Modal
        //   title={questionTitle}
        //   open={isModalOpen}
        //   onOk={handleOk}
        //   onCancel={handleCancel}
        //   footer={[
        //     <Button key="cancel" onClick={handleCancel}>
        //       Cancel
        //     </Button>,
        //     <Button
        //       key="submit"
        //       type="primary"
        //       onClick={handleOk}
        //       disabled={!questionReady}
        //     >
        //       Submit  
        //     </Button>,
        //   ]}
        // >
        //   <QuestionDataContext.Provider value={questionInfo}>
        //     {
        //       modalContent
        //     }
        //   </QuestionDataContext.Provider>
        // </Modal>
      }
      <div className='flex justify-between items-center'>
        <Title level={2}>Questions</Title>
        <div>
          <Dropdown
            menu={{
              items: dropdownItems
            }}
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