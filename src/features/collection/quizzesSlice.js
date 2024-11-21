import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createQuizApi,
  getQuizzes,
  removeQuizApi,
} from "../../utils/firebase.utils";
import { questionConstantsText } from "../../constants/question";

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

export const createCompleteQuiz = createAsyncThunk(
  "quizzes/createCompleteQuiz",
  async (data, { rejectWithValue }) => {
    try {
      fixQuestions(data.questions);
      const { id } = await createQuizApi(data.newQuizzProperties, data.questions);
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

const fixQuestions = (questions) => {
  questions.forEach((question) => {
    if (question.type === questionConstantsText.FILL_IN_THE_BLANKS && question.text && question.text.length > 0) {
      const correctOptions = question.options.filter(({ isCorrect }) => isCorrect);
      const newOptions = [];
      for (const remText of question.text.match(/_+|[^_]+/g) || []) {
        if (/^_+$/i.test(remText)) {
          newOptions.push({ ...correctOptions[0], id: crypto.randomUUID() });
          correctOptions.shift();
        } else {
          newOptions.push({ optionText: remText, id: crypto.randomUUID(), isCorrect: false });
        }
      }
      question.options = JSON.stringify(newOptions);
      question.text = "";
    } else {
      question.options = JSON.stringify(question.options.map((option) => ({ ...option, id: crypto.randomUUID() })));
    }
  });
};
