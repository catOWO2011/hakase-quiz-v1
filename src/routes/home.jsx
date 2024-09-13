import { Cookies } from "react-cookie";
import { redirect } from "react-router-dom";

import { getQuizzes } from "../utils/firebase.utils";

const cookies = new Cookies();

export async function homeLoader() {
  const user = cookies.get('user');
  
  if (!user) {
    return redirect('/auth');
  }

  const quizzes = await getQuizzes();
  
  return {
    quizzes: quizzes
  };
}