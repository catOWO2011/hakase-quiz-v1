import React, { useEffect, useState } from "react";
import { getQuizzes } from "../utils/firebase.utils";
import Title from "antd/es/typography/Title";
import { Button } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeQuiz } from "../features/collection/collectionSlice";

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await getQuizzes();
      console.log(data);
      setQuizzes([...data]);
    };

    loadQuizzes();
  }, []);

  const handleClickHomeIcon = (quizId) => {
    return () => navigate(`/edit-quizz/${quizId}`);
  };

  const handleDelete = (quizId) => {
    return async () => {
      await dispatch(removeQuiz(quizId));
    };
  };

  return (
    <div className="w-full text-center">
      <Title>Quizzes</Title>
      <div className="grid grid-cols-[repeat(auto-fit,_15rem)] gap-6 justify-between">
        {
          quizzes.map(({ id, title }) =>
            <article 
              className="
                flex
                flex-col
                rounded-[8px]
                [box-shadow:0_3px_3px_0_rgba(0,_0,_0,_0.05),_0_5px_15px_0_rgba(0,_0,_0,_0.05)]
                bg-[#ffffff]
                " key={id}
              >
              <div className="flex items-center justify-between pt-6 pb-4 px-5">
                <div className="flex items-center">
                  <h3>{title}</h3>
                </div>
                <div className="p-2 flex justify-between gap-2 items-center">
                  <Button
                    className="cursor-pointer"
                    icon={<EditTwoTone />}
                    onClick={handleClickHomeIcon(id)}
                  />
                  <Button
                    className="cursor-pointer"
                    icon={<DeleteTwoTone />}
                    onClick={handleDelete(id)}
                  >
                  </Button>
                </div>
              </div>
              <div className="px-5 py-4">
                {/* Description */}
              </div>
            </article>
          )
        }
      </div>
    </div>
  );
}

export default Home;
