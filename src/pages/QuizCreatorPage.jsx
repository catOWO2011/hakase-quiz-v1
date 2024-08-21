import { Button, Dropdown, Form, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react'
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

import { useDispatch, useSelector } from 'react-redux';
import { addOneQuestion, addQuestion, deleteQuestion, setQuestions, setQuizId } from '../features/question/questionsSlice';
import FillBlankCreator from '../components/FillBlankCreator';
import MultipleChoiceCreator from '../components/MultipleChoiceCreator';
import MultipleResponseCreator from '../components/MultipleResponseCreator';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

const FILL_IN_THE_BLANKS = 'Fill in the blanks';
const MULTIPLE_CHOICE = 'Multiple choice';
const MULTIPLE_RESPONSE = 'Multiple response';
const FILL_IN_THE_BLANK_ICON = 'ri-space';

// The palete being used is https://colorhunt.co/palette/00a9ff89cff3a0e9ffcdf5fd
// https://colorhunt.co/palette/756ab6ac87c5e0aed0ffe5e5
// Desings https://dribbble.com/shots/20566500-Coding-Quiz-UI-for-Geecko-Skills

// Panel
// https://dribbble.com/shots/21163408-Wayyy-Questions-list

export const QuestionDataContext = React.createContext(null);

function QuizCreatorPage() {
  const quizData = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuizId(quizData.id));
    dispatch(setQuestions(quizData.questions));
  }, [dispatch, quizData.id, quizData.questions])

  const questions = useSelector(state => state.questions.items);
  
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
            <FillBlankCreator />
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

  const handleDeleteQuestion = (id) => {
    return () => {
      toast.promise(
        dispatch(deleteQuestion(id)).unwrap(),
        {
          pending: {
            render() {
              return 'Deleting Question';
            },
            icon: false
          },
          success: {
            render() {
              dispatch(setQuestions(questions.filter(({ id: questionId }) => questionId != id)));
              return 'Question deleted.';
            }
          },
          error: {
            render({ data }) {
              console.error(data);
            }
          }
        }
      );
    };
  };

  const onFinish = async (values) => {
    setIsModalOpen(false);
    toast.promise(
      dispatch(addQuestion(values)).unwrap(),
      {
        pending: {
          render() {
            return "Adding Question...";
          },
          icon: false,
        },
        success: {
          render() {
            return "Question Added";
          },
          icon: "🟢",
        },
        error: {
          render({ data }) {
            console.error(data);
          }
        }
      }
    );
    form.resetFields();
  };

  const handleOnCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
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
          width={1000}
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
              <Button style={{ marginLeft: 8 }} onClick={handleOnCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
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
      <div className='
        grid
        grid-cols-[repeat(4,1fr)]
        [margin-block:4rem]
        gap-4
      '>
        {
          questions.map(
            ({ id, type }, number) => 
              <div key={id} className='
                p-4 
                rounded-[5px]
                shadow-[5px_5px_20px_rgba(0,0,0,0.1)]
                '>
                <div className='
                  flex
                  justify-between
                  align-middle
                '>
                  <span className='
                    mb-4
                    py-[5px]
                    px-[11px]
                    text-2xl
                    inline-block
                    rounded-[5px]
                    bg-[#f6efef]
                    text-[#f04a0c]
                  '>
                    <i className="ri-space"></i>
                  </span>
                  <div className="p-2 flex justify-between gap-2 items-center">
                    <Button
                      className="cursor-pointer"
                      icon={<EditTwoTone />}
                      onClick={() => {}}
                    />
                    <Button
                      className="cursor-pointer"
                      icon={<DeleteTwoTone />}
                      onClick={handleDeleteQuestion(id)}
                    >
                    </Button>
                  </div>
                </div>
                <h4 className='
                  mb-2
                  text-xl
                  font-medium
                '>
                  Question { number + 1 }
                </h4>
              </div>
          )
        }
      </div>
    </Content>
  );
}

export default QuizCreatorPage