import { Button, Flex, Form, Progress } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import FillInBlankField from "../components/FillInBlankField";
import { questionConstantsText } from "../constants/question";
import MultipleChoiceField from "../components/MultipleChoiceField";
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";
import MultipleResponseField from "../components/MultipleResponseField";
import CodeAnswerField from "../components/CodeAnswerField";
import MDEditor from "@uiw/react-md-editor";
import ROMarkdown from "../components/ROMarkdown";

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
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [form] = Form.useForm();

  const getQuestionField = (type, question) => {
    const fields = {
      [`${questionConstantsText.MULTIPLE_CHOICE}`]: (
        <MultipleChoiceField question={question} />
      ),
      [`${questionConstantsText.FILL_IN_THE_BLANKS}`]: (
        <FillInBlankField question={question} />
      ),
      [`${questionConstantsText.MULTIPLE_RESPONSE}`]: (
        <MultipleResponseField question={question} />
      ),
      [`${questionConstantsText.CODE_ANSWER}`]: (
        <CodeAnswerField question={question} />
      )
    };

    return fields[type];
  };

  const evaluate = (correctOptions, answers) => {
    if (answers) {
      if (correctOptions.length === Object.keys(answers).length) {
        for (const { id, optionText } of correctOptions) {
          if (answers[id]) {
            if (
              answers[id].toLowerCase().trim() !==
              optionText.toLowerCase().trim()
            ) {
              return false;
            }
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
    return true;
  };

  const onFinish = async (values) => {
    const correctOptions = JSON.parse(questions[currentIndexQuestion].options)
      .filter(({ isCorrect }) => isCorrect)
      .map(({ id, optionText }) => ({ id, optionText }));
    setCorrect(evaluate(correctOptions, values.answers));
    setShowCheckButton(false);
    setShowHint(true);
  };

  const handleOnNext = () => {
    setCurrentPercent((prevPercent) => prevPercent + step);
    setCurrentIndexQuestion((prevIndex) => prevIndex + 1);
    setShowCheckButton(true);
    setShowHint(false);
    form.resetFields();
  };

  const showQuestion = currentIndexQuestion < totalQuestions;

  const Hint = ({ hint }) => {
    if (hint) {
      return (
        <div className="bg-[#e5fbd6] rounded-md flex align-middle justify-between p-2">
          <Flex className="p-4 bg-[#FBF0B2] rounded-md w-full">
            <MDEditor
              value={hint}
              preview="preview"
              hideToolbar={true}
              height={150}
              className="w-full"
            />
          </Flex>
        </div>
      );
    }
    return <></>;
  };

  return (
    <div className="flex justify-between flex-col p-4">
      <Flex gap="small" vertical className="bg-[#e5fbd6] p-4 mb-4 rounded-md">
        <Progress percent={currentPercent} size={[, 20]} showInfo={false} />
      </Flex>
      {/* {showQuestion && questionz(questions[currentIndexQuestion])} */}
      {showQuestion && 
        <ROMarkdown
          text={questions[currentIndexQuestion].text}
          id={questions[currentIndexQuestion].id}
          extraClasses={'bg-[#FBF0B2] rounded-md'}
        />
      }
      <Form
        form={form}
        className="h-full flex-col justify-between flex p-1 w-full"
        onFinish={onFinish}
      >
        {showQuestion && (
          <>
            <div className="flex justify-center m-auto w-full">
              {getQuestionField(
                questions[currentIndexQuestion].type,
                questions[currentIndexQuestion]
              )}
            </div>
            {/* {showHint && Hint(questions[currentIndexQuestion])} */}
            {showHint &&
              <ROMarkdown
                text={questions[currentIndexQuestion].hint}
                id={questions[currentIndexQuestion].id}
              />
            }
            {!showCheckButton && !correct && (
              <div className="bg-[#ffe6e6] rounded-md flex align-middle justify-between p-2">
                <div>
                  <RiCloseCircleLine size={70} color="#FF8080" />
                </div>
                <div className="text-2xl flex flex-row items-center">
                  <span className="text-[#FF8080]">
                    The correct answer is:{" "}
                    {JSON.parse(questions[currentIndexQuestion].options)
                      .filter(({ isCorrect }) => isCorrect)
                      .map(({ optionText }) => optionText)
                      .join(",")}
                  </span>
                </div>
              </div>
            )}
            {!showCheckButton && correct && (
              <div className="bg-[#e5fbd6] rounded-md flex align-middle justify-between p-2">
                <div>
                  <RiCheckboxCircleLine size={70} color="#7eabb1" />
                </div>
                <div className="text-2xl flex flex-row items-center">
                  <span className="text-[#7eabb1]">Correct Answer</span>
                </div>
              </div>
            )}
            <Form.Item className="flex justify-end mt-2">
              {showCheckButton && (
                <StyledButton
                  className="
                      text-[1.5em]
                      bg-[#514881]
                      text-[#beb8eb]
                      h-full
                      w-full
                      font-bold

                    "
                  type="submit"
                  htmlType="submit"
                >
                  Check
                </StyledButton>
              )}
              {!showCheckButton && (
                <StyledButton
                  onClick={handleOnNext}
                  className="
                      text-[1.5em]
                      bg-[#514881]
                      text-[#beb8eb]
                      h-full
                      w-full
                      font-bold
                      hover:bg-[#514881]
                    "
                  type="link"
                  htmlType="button"
                >
                  Next
                </StyledButton>
              )}
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}
