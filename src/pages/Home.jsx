import React, { useEffect, useState } from "react";
import { getQuizzes } from "../utils/firebase.utils";
import Title from "antd/es/typography/Title";
import { Button } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await getQuizzes();
      console.log(data);
      setQuizzes([...data]);
    };

    loadQuizzes();
  }, []);

  return (
    <div className="w-full">
      <Title>Quizzes</Title>
      <div className="grid grid-cols-[repeat(auto-fit,_15rem)] gap-6">
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
              <div className="flex items-start justify-between pt-6 pb-4 px-5">
                <div className="flex items-center">
                  <h3>{title}</h3>
                </div>
                <div>
                  <Button
                    icon={<EditTwoTone />}
                  />
                  <Button
                    icon={<DeleteTwoTone />}
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
