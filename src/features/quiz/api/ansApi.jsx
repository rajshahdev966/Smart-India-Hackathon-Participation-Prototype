/**
 * @file ansApi.jsx
 * @layer features/quiz/api
 * @description API service to evaluate candidate answers, compute dynamic performance metrics,
 * and persist results to local storage state for analysis and userTotalAnalysis features.
 */

import axiosInstance from '@/config/axiosInstance';
import { MOCK_QUESTIONS, MOCK_TOTAL_ANALYSIS, simulateNetworkDelay } from '@/shared/api/mockData';

/**
 * Submits the complete set of answers for a quiz session and generates results.
 * Dynamically evaluates score, category mastery, and updates cumulative analytics.
 * @param {Object} submissionPayload - { quizId, answers: { [quesId]: optionId }, timeSpentSeconds }
 * @returns {Promise<Object>} Assessment score summary
 */
export const submitAnswersApi = async (submissionPayload) => {
  try {
    // If live backend:
    // const response = await axiosInstance.post('/quiz/submit', submissionPayload);
    // return response.data;

    // Simulate realistic network delay
    await simulateNetworkDelay(500);

    const { answers = {}, timeSpentSeconds = 180 } = submissionPayload;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    // Topic-wise accuracy tracking
    const topicTracker = {};

    const reviews = MOCK_QUESTIONS.map((q) => {
      const selected = answers[q.id];
      const isAttempted = Boolean(selected);
      const isCorrect = isAttempted && selected === q.correctAnswer;

      if (!isAttempted) {
        unattemptedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      // Track by topic
      if (!topicTracker[q.topic]) {
        topicTracker[q.topic] = { total: 0, correct: 0 };
      }
      topicTracker[q.topic].total++;
      if (isCorrect) topicTracker[q.topic].correct++;

      return {
        questionId: q.id,
        questionText: q.questionText,
        topic: q.topic,
        userAnswer: selected || null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        timeSpent: Math.round(timeSpentSeconds / MOCK_QUESTIONS.length),
      };
    });

    const total = MOCK_QUESTIONS.length;
    const scorePercentage = Math.round((correctCount / total) * 100);
    const accuracy = total - unattemptedCount > 0
      ? Math.round((correctCount / (total - unattemptedCount)) * 100)
      : 0;

    // Build dynamic category breakdown for Recharts
    const categoryBreakdown = Object.keys(topicTracker).map((topicName) => {
      const item = topicTracker[topicName];
      const topicScore = Math.round((item.correct / item.total) * 100);
      return {
        category: topicName,
        score: topicScore,
        fullMark: 100,
      };
    });

    const completedDate = new Date();
    const formattedDateStr = completedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const analysisResult = {
      quizId: 'quiz_tech_assessment_01',
      quizTitle: 'Full-Stack Technical Assessment 2026',
      completedAt: formattedDateStr,
      totalQuestions: total,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unattempted: unattemptedCount,
      scorePercentage,
      accuracy,
      totalTimeSpentSeconds: timeSpentSeconds,
      averageTimePerQuestionSeconds: Math.round(timeSpentSeconds / total),
      categoryBreakdown,
      questionReviews: reviews,
      passed: scorePercentage >= 60,
    };

    // Store in localStorage so AnalysisPage gets user's actual attempt
    try {
      localStorage.setItem('sih_latest_quiz_analysis', JSON.stringify(analysisResult));

      // Update cumulative UserTotalAnalysis in localStorage
      const existingTotalStr = localStorage.getItem('sih_user_total_analysis');
      const totalData = existingTotalStr ? JSON.parse(existingTotalStr) : { ...MOCK_TOTAL_ANALYSIS };

      const updatedQuizzes = (totalData.totalQuizzesTaken || 0) + 1;
      const updatedQuestions = (totalData.totalQuestionsAttempted || 0) + total;
      const timelineDate = completedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Add point to timeline
      const updatedTimeline = [
        ...(totalData.performanceTimeline || []),
        { date: timelineDate, score: scorePercentage, average: 72 },
      ].slice(-7); // Keep last 7 attempts

      // Recalculate overall accuracy
      const newAccuracyRate = Number(
        (((totalData.overallAccuracyRate || 80) * 0.7) + (scorePercentage * 0.3)).toFixed(1)
      );

      const updatedTotalData = {
        ...totalData,
        totalQuizzesTaken: updatedQuizzes,
        totalQuestionsAttempted: updatedQuestions,
        overallAccuracyRate: newAccuracyRate,
        performanceTimeline: updatedTimeline,
      };

      localStorage.setItem('sih_user_total_analysis', JSON.stringify(updatedTotalData));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    return analysisResult;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Submission failed. Please try again.';
  }
};
