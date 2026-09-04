/**
 * @file QuizPage.jsx
 * @layer features/quiz/ui/page
 * @description Main Assessment examination interface connecting QuesComp, QuesNav palette,
 * live timer, dynamic answer submission, and proctoring security safeguards.
 */

import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import QuesComp from '../comp/QuesComp';
import QuesNav from '../comp/QuesNav';
import { useQues } from '../../hooks/useQues';
import { useExamSecurity } from '../../hooks/useExamSecurity';
import { useQuizContext } from '@/context/QuizContext';
import Button from '@/shared/ui/Button';

export const QuizPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentIndex,
    currentQuestion,
    userAnswers,
    markedForReview,
    isLoading,
    isSubmitting,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    chooseOption,
    toggleReview,
    clearAnswer,
    resetQuiz,
    submitQuiz,
  } = useQues();

  const {
    formattedTime,
    timeRemaining,
    isTimerRunning,
    startTimer,
    initQuizSession,
    isSubmitted,
    setIsSubmitted,
  } = useQuizContext();

  // Reset quiz session and timer cleanly whenever user enters the Quiz page
  useEffect(() => {
    initQuizSession(600);
    resetQuiz();
  }, [initQuizSession]);

  // Submission handler
  const handleSubmit = useCallback(async () => {
    const timeSpent = Math.max(1, 600 - timeRemaining);
    const res = await submitQuiz(timeSpent);
    if (res.success) {
      setIsSubmitted(true);
      navigate('/analysis');
    }
  }, [submitQuiz, timeRemaining, setIsSubmitted, navigate]);

  // Integrated proctoring security hook
  const {
    violations,
    maxViolations,
    securityAlert,
    dismissAlert,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
  } = useExamSecurity({
    isExamActive: !isSubmitted && questions.length > 0,
  });

  // Start timer once questions are available and test is active
  useEffect(() => {
    if (questions.length > 0 && !isSubmitted && !isTimerRunning) {
      startTimer();
    }
  }, [questions.length, isSubmitted, isTimerRunning, startTimer]);

  // Auto-submit on timer expiry only when timer was actively running
  useEffect(() => {
    if (isTimerRunning && timeRemaining === 0 && !isSubmitted && questions.length > 0) {
      handleSubmit();
    }
  }, [isTimerRunning, timeRemaining, isSubmitted, questions.length, handleSubmit]);

  // Loading indicator until questions are fetched into Redux
  if (isLoading || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500">Preparing secure assessment environment...</p>
      </div>
    );
  }

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="max-w-7xl mx-auto px-4 py-6 select-none"
    >
      {/* Real-Time Security Alert Banner */}
      {securityAlert && (
        <div
          className={`mb-4 p-4 rounded-xl border flex items-center justify-between transition-all shadow-sm ${
            securityAlert.severity === 'critical'
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : 'bg-amber-50 border-amber-300 text-amber-800'
          }`}
        >
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
            <span>{securityAlert.message}</span>
          </div>
          <button
            onClick={dismissAlert}
            className="p-1 hover:bg-black/5 rounded text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Bar: Title, Security Status, Fullscreen, and Countdown Timer */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Full-Stack Technical Assessment 2026
            </h2>
            <div className="flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Proctored Secure</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Integrity monitoring active • Tab switch violations: {violations}/{maxViolations}
          </p>
        </div>

        {/* Right Header Controls: Fullscreen toggle & Timer */}
        <div className="flex items-center gap-3">
          <button
            onClick={isFullscreen ? exitFullscreen : enterFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </>
            )}
          </button>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm font-bold shadow-xs ${
              timeRemaining < 120
                ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Question Board (Left) + Palette (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Area (8 columns on large screens) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <QuesComp
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedOption={currentQuestion ? userAnswers[currentQuestion.id] : null}
            isMarked={currentQuestion ? markedForReview.includes(currentQuestion.id) : false}
            onSelectOption={chooseOption}
            onToggleReview={toggleReview}
            onClearAnswer={clearAnswer}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <Button
              variant="outline"
              size="md"
              icon={ChevronLeft}
              disabled={currentIndex === 0}
              onClick={prevQuestion}
            >
              Previous Question
            </Button>

            <span className="text-xs text-slate-500 font-medium">
              Question {currentIndex + 1} of {questions.length}
            </span>

            {currentIndex < questions.length - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={nextQuestion}
                className="flex-row-reverse"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="success"
                size="md"
                onClick={handleSubmit}
                isLoading={isSubmitting}
              >
                Finish & Submit
              </Button>
            )}
          </div>
        </div>

        {/* Palette Navigator (4 columns on large screens) */}
        <div className="lg:col-span-4">
          <QuesNav
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            markedForReview={markedForReview}
            onSelectIndex={goToQuestion}
            onSubmitQuiz={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
