import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createQuestionApi,
  deleteQuestionApi,
  editQuestionApi,
} from "../../utils/firebase.utils";
import { toast } from "react-toastify";

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (question, { rejectWithValue, getState }) => {
    try {
      const {
        questions: { quizId },
      } = getState();
      question = {
        quizId,
        ...question,
      };
      const questionRef = await createQuestionApi(question);
      return {
        id: questionRef.id,
        ...question,
      };
    } catch (error) {
      toast.error("Failed to create the question");
      return rejectWithValue(error.message);
    }
  }
);

export const editQuestion = createAsyncThunk(
  "questions/editQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const { id, ...newQuestionData } = question;
      await editQuestionApi(id, newQuestionData);
      return question;
    } catch (error) {
      toast.error("Failed to edit the question");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      await deleteQuestionApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  quizId: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuizId(state, action) {
      state.quizId = action.payload;
    },
    addOneQuestion(state, action) {
      state.items.push(action.payload);
    },
    setQuestions(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id != action.payload.id);
        state.items.push(action.payload);
      });
  },
});

export const { setQuizId, setQuestions, addOneQuestion } =
  questionsSlice.actions;

export default questionsSlice.reducer;
