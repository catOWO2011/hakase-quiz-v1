import { getQuizApi } from "../utils/firebase.utils";

export async function quizLoader({ params }) {
  const { quiz } = await getQuizApi(params.quizId);
  return quiz;
};