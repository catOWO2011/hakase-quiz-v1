import { Cookies } from "react-cookie";
import { redirect } from "react-router-dom";

import { getQuizApi } from "../utils/firebase.utils";

const cookies = new Cookies();

export async function quizLoader({ params }) {
  const user = cookies.get('user');
  
  if (!user) {
    return redirect('/auth');
  }

  const { quiz } = await getQuizApi(params.quizId);
  return quiz;
};