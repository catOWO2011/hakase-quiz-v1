import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addQuestion = createAsyncThunk('questions/addQuestion', async () => {
    
});

const initialState = {
    items: [],
    quizzId: null
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuizId(state, action) {
            state.quizzId = action.payload;
        }
    }
});

export const {
    setQuizId
} = questionsSlice.actions;

export default questionsSlice.reducer;