/**
 * @file quesList.jsx
 * @layer features/quiz/state
 * @description Redux Toolkit slice managing quiz questions list, current question pointer,
 * student's selected answers, marked questions for review, and submission status.
 */

import { createSlice } from '@reduxjs/toolkit';
import { MOCK_QUESTIONS } from '@/shared/api/mockData';

const initialState = {
  questions: MOCK_QUESTIONS, // Instantly available to eliminate render blanks
  currentIndex: 0,
  userAnswers: {}, // { [questionId]: selectedOptionId }
  markedForReview: [], // array of questionIds
  isLoading: false,
  isSubmitting: false,
  error: null,
  submissionResult: null,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // Start loading questions
    fetchQuestionsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Questions loaded successfully
    fetchQuestionsSuccess: (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
      state.currentIndex = 0;
      state.userAnswers = {};
      state.markedForReview = [];
      state.submissionResult = null;
    },
    // Questions failed to load
    fetchQuestionsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Set question active index
    setCurrentQuestionIndex: (state, action) => {
      if (action.payload >= 0 && action.payload < state.questions.length) {
        state.currentIndex = action.payload;
      }
    },
    // Record student answer selection
    selectOptionAnswer: (state, action) => {
      const { questionId, optionId } = action.payload;
      state.userAnswers[questionId] = optionId;
    },
    // Toggle review status for a question
    toggleMarkForReview: (state, action) => {
      const questionId = action.payload;
      if (state.markedForReview.includes(questionId)) {
        state.markedForReview = state.markedForReview.filter((id) => id !== questionId);
      } else {
        state.markedForReview.push(questionId);
      }
    },
    // Reset answers for the current question
    clearCurrentAnswer: (state, action) => {
      const questionId = action.payload;
      delete state.userAnswers[questionId];
    },
    // Submitting quiz
    submitQuizStart: (state) => {
      state.isSubmitting = true;
      state.error = null;
    },
    // Quiz successfully submitted
    submitQuizSuccess: (state, action) => {
      state.isSubmitting = false;
      state.submissionResult = action.payload;
    },
    // Quiz submission failed
    submitQuizFailure: (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    // Reset state for new quiz attempt
    resetQuizSession: (state) => {
      state.currentIndex = 0;
      state.userAnswers = {};
      state.markedForReview = [];
      state.submissionResult = null;
      state.error = null;
    },
    // Load custom AI-generated questions from uploaded learning material
    loadCustomQuestions: (state, action) => {
      state.questions = action.payload;
      state.currentIndex = 0;
      state.userAnswers = {};
      state.markedForReview = [];
      state.submissionResult = null;
      state.error = null;
    },
  },
});

export const {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  setCurrentQuestionIndex,
  selectOptionAnswer,
  toggleMarkForReview,
  clearCurrentAnswer,
  submitQuizStart,
  submitQuizSuccess,
  submitQuizFailure,
  resetQuizSession,
  loadCustomQuestions,
} = quizSlice.actions;

// Selectors
export const selectQuestions = (state) => state.quiz.questions;
export const selectCurrentIndex = (state) => state.quiz.currentIndex;
export const selectCurrentQuestion = (state) =>
  state.quiz.questions[state.quiz.currentIndex] || null;
export const selectUserAnswers = (state) => state.quiz.userAnswers;
export const selectMarkedForReview = (state) => state.quiz.markedForReview;
export const selectQuizLoading = (state) => state.quiz.isLoading;
export const selectQuizSubmitting = (state) => state.quiz.isSubmitting;
export const selectSubmissionResult = (state) => state.quiz.submissionResult;

export default quizSlice.reducer;
