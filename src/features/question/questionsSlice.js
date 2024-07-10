import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createQuestionApi } from "../../utils/firebase.utils";

export const addQuestion = createAsyncThunk('questions/addQuestion', async (question, { rejectWithValue, getState }) => {
    try {
        const { questions: { quizId } } = getState();
        question = {
            quizId,
            ...question
        };
        console.log(question, 'question');
        // const questionRef = await createQuestionApi(question);
        // return {
        //     id: questionRef.id,
        //     ...question
        // };
    } catch (error) {
        
    }
});

const initialState = {
    items: [],
    quizId: null
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuizId(state, action) {
            state.quizId = action.payload;
        }
    }
});

export const {
    setQuizId
} = questionsSlice.actions;

export default questionsSlice.reducer;