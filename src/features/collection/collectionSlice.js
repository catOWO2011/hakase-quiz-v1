import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createQuizApi, removeQuizApi } from "../../utils/firebase.utils";

const initialState = {
    quizzes: []
};

export const removeQuiz = createAsyncThunk('quizzes/removeQuiz', async (id) => {
    const a = await removeQuizApi(id);
});

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addQuiz(state, action) {
            state.quizzes.push(action.payload);
        },
    }
});

export const {
    addQuiz
} = collectionSlice.actions;

export default collectionSlice.reducer;

export const createQuiz = (quiz) => {
    return async (dispatch) => {
        const data = await createQuizApi(quiz);
        const newQuiz = { id: data.id };
        dispatch(collectionSlice.actions.addQuiz(newQuiz));
        return newQuiz;
    };
};