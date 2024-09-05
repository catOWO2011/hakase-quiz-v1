import { Button, Flex, Form, Progress } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { useLoaderData } from "react-router-dom"
import styled from "styled-components";

import FillInBlankField from "../components/FillInBlankField";
import { questionConstantsText } from "../constants/question";
import MultipleChoiceField from "../components/MultipleChoiceField";
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";

const StyledButton = styled(Button)`
  &:hover {
    background-color: #b8b8ff !important;
    color: #7469b6 !important;
    border: 2px solid #7469b6;
  }
`;

export default function QuizPractice() {
  const { questions } = useLoaderData();
  const totalQuestions = questions.length;
  const step = 100 / totalQuestions;
  const [currentPercent, setCurrentPercent] = useState(0);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [indexButton, setIndexButton] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [form] = Form.useForm();

  const getQuestionField = (type, question) => {
    const fields = {
      [`${questionConstantsText.MULTIPLE_CHOICE}`]: (<MultipleChoiceField question={question}/>),
      [`${questionConstantsText.FILL_IN_THE_BLANKS}`]: (<FillInBlankField question={question}/>)
    };

    return fields[type];
  };

  const evaluate = (correctOptions, answers) => {
    if (correctOptions.length === Object.keys(answers).length) {
      for (const { id, optionText } of correctOptions) {
        if (answers[id]) {
          if (answers[id].toLowerCase().trim() !== optionText.toLowerCase().trim()) {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  };

  const onFinish = async (values) => {
    const correctOptions = JSON.parse(questions[currentIndexQuestion].options).filter(({ isCorrect }) => isCorrect).map(({ id, optionText }) => ({id, optionText}));
    setCorrect(evaluate(correctOptions, values.answers));
    setIndexButton(prevIndex => prevIndex + 1);
  };

  const handleOnClick = () => {
    setIndexButton(prevIndex => prevIndex + 1);
    setCurrentPercent(prevPercent => prevPercent + step);
    setCurrentIndexQuestion(prevIndex => prevIndex + 1);
  };

  return (
    <Content className="flex justify-between flex-col bg-[#E3DFFD] m-[2rem] p-4 rounded-md">
      <Flex gap="small" vertical className="bg-[#e5fbd6] p-4 mb-4 rounded-md">
        <Progress percent={currentPercent} size={[,20]} showInfo={false}/>
      </Flex>
      <Form form={form} className="h-full flex-col justify-between flex p-1" onFinish={onFinish}>
        {
          currentIndexQuestion < totalQuestions &&
          (<>
            <div className="flex justify-center m-auto">
              {
                getQuestionField(questions[currentIndexQuestion].type, questions[currentIndexQuestion])
              }
            </div>
            <Form.Item className="flex justify-end">
              {
                (indexButton % 2 == 0) && 
                <StyledButton 
                  className="
                    text-[1.5em]
                    bg-[#514881]
                    text-[#beb8eb]
                    h-full
                    w-full
                    font-bold

                  "
                  type="submit" htmlType="submit"
                >
                  Check
                </StyledButton>
              }
              {
                (indexButton % 2 != 0) && 
                <StyledButton 
                  onClick={handleOnClick}
                  className="
                    text-[1.5em]
                    bg-[#514881]
                    text-[#beb8eb]
                    h-full
                    w-full
                    font-bold
                    hover:bg-[#514881]
                  "
                  type="link" htmlType="button"
                >
                  Next
                </StyledButton>
              }
            </Form.Item>
          </>)
        }
      </Form>
      {
        (indexButton % 2 != 0) && correct &&
        <div className="bg-[#e5fbd6] rounded-md flex align-middle justify-between p-2">
          <div>
            <RiCheckboxCircleLine
              size={70}
              color="#7eabb1"
            />
          </div>
          <div className="text-3xl flex flex-row items-center">
            <span className="text-[#7eabb1]">
              Correct Answer
            </span>
          </div>
        </div>
      }
      {
        (indexButton % 2 != 0) && correct === false &&
        <div className="bg-[#ffe6e6] rounded-md flex align-middle justify-between p-2">
          <div>
            <RiCloseCircleLine
              size={70}
              color="#FF8080"
            />
          </div>
          <div className="text-3xl flex flex-row items-center">
            <span className="text-[#FF8080]">
              The correct answer is: {JSON.parse(questions[currentIndexQuestion].options).filter(({ isCorrect }) => isCorrect).map(({optionText }) => optionText).join(',')}
            </span>
          </div>
        </div>
      }
    </Content>
  );
}