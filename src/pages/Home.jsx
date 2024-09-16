import { useEffect, useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ScrollReveal from "scrollreveal";

import { addQuizzes, removeQuiz } from "../features/collection/quizzesSlice";
import { setQuizId } from "../features/question/questionsSlice";
import {
  StyledDeleteIcon,
  StyledEditIcon,
  StyledIconButton,
  StyledPlayIcon,
} from "../components/IconButton";
import styled from "styled-components";

const QuizItem = ({
    id,
    title,
    handleClickHomeIcon,
    handleDelete,
    handleClickPlayIcon,
    className
  }) => {

  return (
    <article
      className={`
                flex
                flex-col
                rounded-[8px]
                [box-shadow:0_3px_3px_0_rgba(0,_0,_0,_0.05),_0_5px_15px_0_rgba(0,_0,_0,_0.05)]
                bg-[#ffffff]
                ${className}
                `}
      key={id}
    >
      <div className="flex items-center justify-between pt-6 pb-4 px-5">
        <div className="flex items-center">
          <h3>{title}</h3>
        </div>
        <div className="p-2 flex justify-between gap-2 items-center">
          <StyledIconButton
            icon={<StyledEditIcon />}
            onClick={handleClickHomeIcon(id)}
          />
          <StyledIconButton
            icon={<StyledDeleteIcon />}
            onClick={handleDelete(id)}
          />
          <StyledIconButton
            icon={<StyledPlayIcon />}
            onClick={handleClickPlayIcon(id)}
          />
        </div>
      </div>
      <div className="px-5 py-4">{/* Description */}</div>
    </article>
  );
};

const StyledQuizItem = styled(QuizItem)`
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

function Home() {
  const { quizzes } = useLoaderData();
  const [quizzesCollection, setQuizzesCollection] = useState(quizzes);
  const quizzesOnRedux = useSelector(state => state.quizzes.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizListRef = useRef(null);

  useEffect(() => {
    ScrollReveal().reveal(quizListRef.current.children, {
      duration: 1000,
      interval: 300,
      delay: 300
    });
    dispatch(addQuizzes(quizzes));
  }, [dispatch, quizzes]);

  useEffect(() => {
    if (quizzesOnRedux.length > 0) {
      setQuizzesCollection([...quizzesOnRedux]);
    }
  }, [quizzesOnRedux]);

  const handleClickHomeIcon = (quizId) => {
    return () => {
      dispatch(setQuizId(quizId));
      navigate(`/quizzes/${quizId}/edit`);
    };
  };

  const handleClickPlayIcon = (quizId) => {
    return () => {
      dispatch(setQuizId(quizId));
      navigate(`/quizzes/${quizId}/practice`);
    };
  };

  const handleDelete = (quizId) => {
    return () => {
      toast.promise(dispatch(removeQuiz(quizId)).unwrap(), {
        pending: {
          render() {
            return "Deleting Quiz";
          },
          icon: false,
        },
        success: {
          render() {
            return "Quiz deleted";
          },
          icon: "🟢",
        },
        error: {
          render({ data }) {
            console.error(data);
          },
        },
      });
    };
  };

  return (
    <div className="w-full text-center px-8">
      <Title className="font-[Montserrat] custom-title" >Quizzes</Title>
      <div
        className="grid grid-cols-[repeat(auto-fit,_15rem)] gap-6"
        ref={quizListRef}
      >
        {quizzesCollection.map(({ id, title }, index) => (
          <StyledQuizItem {...{
            id,
            title,
            key: id,
            handleClickHomeIcon,
            handleClickPlayIcon,
            handleDelete
          }}/>
        ))}
      </div>
    </div>
  );
}

export default Home;
