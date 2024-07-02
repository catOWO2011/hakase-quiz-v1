import { configureStore } from "@reduxjs/toolkit";

import quizzesReducer from './features/collection/quizzesSlice';
import questionsReducer from './features/question/questionsSlice';

const store = configureStore({
    reducer: {
        quizzes: quizzesReducer,
        questions: questionsReducer
    }
});

export default store;