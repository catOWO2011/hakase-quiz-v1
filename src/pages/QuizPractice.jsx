import { Button, Flex, Form, Progress } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { useLoaderData } from "react-router-dom"

import FillInBlankField from "../components/FillInBlankField";
import { questionConstantsText } from "../constants/question";
import MultipleChoiceField from "../components/MultipleChoiceField";

export default function QuizPractice() {
  const { questions } = useLoaderData();
  const totalQuestions = questions.length;
  const step = 100 / totalQuestions;
  const [currentPercent, setCurrentPercent] = useState(0);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [form] = Form.useForm();

  const getQuestionField = (type, question) => {
    const fields = {
      [`${questionConstantsText.MULTIPLE_CHOICE}`]: (<MultipleChoiceField question={question}/>),
      [`${questionConstantsText.FILL_IN_THE_BLANKS}`]: (<FillInBlankField question={question}/>)
    };

    return fields[type];
  };

  const onFinish = async (values) => {
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
              <Button 
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
                Next
              </Button>
            </Form.Item>
          </>)
        }
      </Form>
    </Content>
  );
}
