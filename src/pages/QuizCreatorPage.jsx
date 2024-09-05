import { Button, Dropdown } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { deleteQuestion, setQuestions, setQuizId } from '../features/question/questionsSlice';
import { questionConstantsText, questionIcons } from '../constants/question';
import QuestionModal from '../components/QuestionModal';
import { StyledDeleteIcon, StyledEditIcon, StyledIconButton } from '../components/IconButton';

// The palete being used is https://colorhunt.co/palette/00a9ff89cff3a0e9ffcdf5fd
// https://colorhunt.co/palette/756ab6ac87c5e0aed0ffe5e5
// Desings https://dribbble.com/shots/20566500-Coding-Quiz-UI-for-Geecko-Skills

// https://dribbble.com/shots/21163408-Wayyy-Questions-list

const QuestionDropdownButton = styled(Dropdown)`
  background-color: #ee9d9a;
  font-size: 1.2em;
  color: #f8edeb;
  font-weight: 600;
  &:hover {
    background-color: #ee9d9a !important;
    color: #f8edeb !important;
    border: #f8ad9d solid !important;
  }
`;

function QuizCreatorPage() {
  const quizData = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuizId(quizData.id));
    dispatch(setQuestions(quizData.questions));
  }, [dispatch, quizData.id, quizData.questions]);

  const questions = useSelector(state => state.questions.items);
  
  const handleAddQuestion = (questionType) => {
    return () => {
      setIsModalOpen(true);
      setModalData({
        question: {
          text: '',
          options: '[]',
          type: questionType
        },
        isOpen: true,
        setIsOpen: setIsModalOpen
      });
    };
  };

  const handleEditQuestion = (id) => {
    return () => {
      const question = questions.find((question) => id == question.id);
      setIsModalOpen(true);
      setModalData({
        isOpen: true,
        setIsOpen: setIsModalOpen,
        question
      });
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

  const dropdownItems = [
    {
      key: '1',
      label: (
        <button
          onClick={handleAddQuestion(questionConstantsText.FILL_IN_THE_BLANKS)}
        >
          {questionConstantsText.FILL_IN_THE_BLANKS}
        </button>
      )
    },
    {
      key: '2',
      label: (
        <button
          onClick={handleAddQuestion(questionConstantsText.MULTIPLE_CHOICE)}
          className=''
        >
          {questionConstantsText.MULTIPLE_CHOICE}
        </button>
      )
    },
    {
      key: '3',
      label: (
        <button
          onClick={handleAddQuestion(questionConstantsText.MULTIPLE_RESPONSE)}
        >
          {questionConstantsText.MULTIPLE_RESPONSE}
        </button>
      )
    }
  ];

  return (
    <Content>
      {
        isModalOpen &&
        <QuestionModal
          {...modalData}
        />
      }
      <div className='flex justify-between items-center'>
        <Title level={2}>Questions</Title>
        <div>
          <QuestionDropdownButton
            menu={{
              items: dropdownItems
            }}
            className='flex items-center justify-center'
          >
            <Button
              icon={<PlusOutlined className='text-lg font-bold'/>}
              type='primary'
            >
              Question
            </Button>
          </QuestionDropdownButton>
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
                bg-[#fcd5ce]
                p-4 
                rounded-[5px]
                shadow-[5px_5px_20px_rgba(0,0,0,0.1)]
                hover:bg-[#fde5e6]
                '>
                <div className='
                  flex
                  justify-between
                  align-middle
                '>
                  <span className={`
                    mb-4
                    py-[5px]
                    px-[11px]
                    text-2xl
                    inline-block
                    rounded-[5px]
                    bg-[#c9d4ff]
                  `}
                  >
                    <img 
                      className='rounded-[5px]'
                      src={questionIcons[type]}
                      alt='fill in the blanks logo'
                    />
                  </span>
                  <div className="p-2 flex justify-between gap-2 items-center">
                    <StyledIconButton icon={<StyledEditIcon/>} onClick={handleEditQuestion(id)}/>
                    <StyledIconButton icon={<StyledDeleteIcon />} onClick={handleDeleteQuestion(id)}/>
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