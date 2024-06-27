import { configureStore } from "@reduxjs/toolkit";

import quizzesReducer from './features/collection/quizzesSlice';

const store = configureStore({
    reducer: {
        quizzes: quizzesReducer
    }
});

export default store;