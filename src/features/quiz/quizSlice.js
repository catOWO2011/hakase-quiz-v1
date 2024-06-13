import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: []
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        addQuestion(state, action) {
            state.questions.push(action.payload);
        }
    }
});

export const sendQuestion = (question) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            
        };
    };
};