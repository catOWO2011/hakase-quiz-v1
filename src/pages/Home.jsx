import React, { useEffect } from "react";
import { getQuizzes } from "../utils/firebase.utils";

function Home() {
  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await getQuizzes();
      console.log(data);
    };

    loadQuizzes();
  }, []);

  return <div>Home</div>;
}

export default Home;
