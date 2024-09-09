import { configureStore } from "@reduxjs/toolkit";

import quizzesReducer from "./features/collection/quizzesSlice";
import questionsReducer from "./features/question/questionsSlice";
import usersReducer from "./features/user/usersSlice";

const store = configureStore({
  reducer: {
    quizzes: quizzesReducer,
    questions: questionsReducer,
    users: usersReducer
  },
});

export default store;