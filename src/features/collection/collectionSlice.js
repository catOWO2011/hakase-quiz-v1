import { createSlice } from "@reduxjs/toolkit";
import { createQuizz } from "../../utils/firebase.utils";

const initialState = {
    quizzes: []
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addQuiz(state, action) {
            state.quizzes.push(action.payload);
        }
    }
});

export const {
    addQuiz
} = collectionSlice.actions;

export default collectionSlice.reducer;

export const sendQuiz = (quiz) => {
    return async (dispatch) => {
        const data = await createQuizz(quiz);
        const newQuiz = { id: data.id };
        dispatch(collectionSlice.actions.addQuiz(newQuiz));
        return newQuiz;
    };
};