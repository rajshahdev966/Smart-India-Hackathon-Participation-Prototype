/**
 * @file QuizContext.jsx
 * @description Context for live quiz session mechanics: active question index, total duration,
 * running countdown timer, and marked questions.
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const QuizContext = createContext(null);

export const QuizProvider = ({ children, initialTimeRemaining = 600 }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef(null);

  // Countdown timer effect
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0 && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsSubmitted(true);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, isSubmitted]);

  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetTimer = useCallback((newDuration = 600) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setTimeRemaining(newDuration);
    setIsSubmitted(false);
  }, []);

  // Full session re-initialization
  const initQuizSession = useCallback((newDuration = 600) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setTimeRemaining(newDuration);
    setIsSubmitted(false);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <QuizContext.Provider
      value={{
        timeRemaining,
        formattedTime: formatTime(timeRemaining),
        isTimerRunning,
        isSubmitted,
        setIsSubmitted,
        startTimer,
        pauseTimer,
        resetTimer,
        initQuizSession,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};

export default QuizContext;
