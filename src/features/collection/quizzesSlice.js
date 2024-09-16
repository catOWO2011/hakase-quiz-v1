import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createQuizApi,
  getQuizzes,
  removeQuizApi,
} from "../../utils/firebase.utils";

const IDLE = "idle";

export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async () => {
    return await getQuizzes();
  }
);

export const removeQuiz = createAsyncThunk(
  "quizzes/removeQuiz",
  async (id, { rejectWithValue }) => {
    try {
      await removeQuizApi(id);
      return id;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: IDLE,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz(state, action) {
      state.items.push(action.payload);
    },
    addQuizzes(state, action) {
      state.items = [...action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeQuiz.fulfilled, (state, action) => {
        state.items = state.items.filter((quiz) => quiz.id !== action.payload);
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addQuiz, addQuizzes } = quizzesSlice.actions;

export default quizzesSlice.reducer;

export const createQuiz = (quiz) => {
  return async (dispatch) => {
    const data = await createQuizApi(quiz);
    const newQuiz = { id: data.id };
    dispatch(quizzesSlice.actions.addQuiz(newQuiz));
    return newQuiz;
  };
};
