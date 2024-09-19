import { Button, Form, Modal } from "antd";
import { questionConstantsText } from "../constants/question";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import FillBlankCreator from "./FillBlankCreator";
import MultipleChoiceCreator from "./MultipleChoiceCreator";
import MultipleResponseCreator from "./MultipleResponseCreator";
import CodeAnswer from "./CodeAnswerCreator";
import { addQuestion, editQuestion } from "../features/question/questionsSlice";

const getQuestionCreatorComponent = (question) => {
  let component = "";
  switch (question.type) {
    case questionConstantsText.FILL_IN_THE_BLANKS:
      component = <FillBlankCreator question={question} />;
      break;
    case questionConstantsText.MULTIPLE_CHOICE:
      component = <MultipleChoiceCreator question={question} />;
      break;
    case questionConstantsText.MULTIPLE_RESPONSE:
      component = <MultipleResponseCreator question={question}/>;
      break;
    case questionConstantsText.CODE_ANSWER:
      component = <CodeAnswer question={question}/>;
      break;
  }
  return component;
};

function QuestionModal({ isOpen, setIsOpen, question }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOnCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    setIsOpen(false);
    if (question.id) {
      toast.promise(
        dispatch(editQuestion({
          ...question,
          ...values,
        })).unwrap(),
        {
          pending: {
            render() {
              return "Editing Question...";
            },
            icon: false,
          },
          success: {
            render() {
              return "Question Edited";
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
    } else {
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
    }
    form.resetFields();
  };

  return (
    <Modal
      title={question.type}
      open={isOpen}
      onCancel={handleOnCancel}
      footer={null}
      width={1000}
    >
      <Form form={form} onFinish={onFinish}>
        {getQuestionCreatorComponent(question)}
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
  );
}

export default QuestionModal;
