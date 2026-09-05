/**
 * @file ansApi.jsx
 * @layer features/quiz/api
 * @description API service to evaluate candidate answers, compute dynamic performance metrics,
 * and persist results to local storage state for analysis and userTotalAnalysis features.
 */

import axiosInstance from '@/config/axiosInstance';
import { MOCK_QUESTIONS_WITH_ANSWERS, MOCK_TOTAL_ANALYSIS, simulateNetworkDelay } from '@/shared/api/mockData';

/**
 * Submits the complete set of answers for a quiz session and generates results.
 * Dynamically evaluates score, category mastery, and updates cumulative analytics.
 * Answers are evaluated against the authoritative MOCK_QUESTIONS_WITH_ANSWERS dataset.
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

    const reviews = MOCK_QUESTIONS_WITH_ANSWERS.map((q) => {
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
        timeSpent: Math.round(timeSpentSeconds / MOCK_QUESTIONS_WITH_ANSWERS.length),
      };
    });

    const total = MOCK_QUESTIONS_WITH_ANSWERS.length;
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

    // Determine overall proficiency tier
    let proficiencyLevel = 'Novice';
    if (scorePercentage >= 90) proficiencyLevel = 'Expert';
    else if (scorePercentage >= 75) proficiencyLevel = 'Proficient';
    else if (scorePercentage >= 60) proficiencyLevel = 'Competent';
    else if (scorePercentage >= 40) proficiencyLevel = 'Developing';

    // Compute Skill Split: Theoretical (Q1, Q2, Q4) vs Application (Q3, Q5)
    const theoreticalQuestions = reviews.filter((r) => [1, 2, 4].includes(r.questionId));
    const applicationQuestions = reviews.filter((r) => [3, 5].includes(r.questionId));

    const theoreticalCorrect = theoreticalQuestions.filter((q) => q.isCorrect).length;
    const applicationCorrect = applicationQuestions.filter((q) => q.isCorrect).length;

    const theoreticalScore = theoreticalQuestions.length > 0
      ? Math.round((theoreticalCorrect / theoreticalQuestions.length) * 100)
      : 0;
    const applicationScore = applicationQuestions.length > 0
      ? Math.round((applicationCorrect / applicationQuestions.length) * 100)
      : 0;

    const skillSplit = [
      { skill: 'Theoretical', score: theoreticalScore },
      { skill: 'Application', score: applicationScore },
    ];

    // Compute Strengths & Knowledge Gaps lists
    const topicDetails = {
      'Data Structures & Algorithms': 'Balanced Tree Traversal & Big-O Complexity Bounds',
      'Web Architecture & Protocols': 'HTTP Authentication & Client Authorization Standards',
      'Database Management Systems': 'ACID Transaction Concurrency & Isolation',
      'Operating Systems': 'Coffman Deadlock Conditions & Resource Preemption Rules',
      'Computer Networks': 'Transport Layer Datagrams & Connectionless Communication',
    };

    const strengths = reviews
      .filter((r) => r.isCorrect)
      .map((r) => `${r.topic} (${topicDetails[r.topic] || 'Applied Domain Competency'})`);

    const knowledgeGaps = reviews
      .filter((r) => !r.isCorrect)
      .map((r) => `${r.topic} (${topicDetails[r.topic] || 'Foundational Principles'})`);

    if (strengths.length === 0) {
      strengths.push('Foundational exposure to core technical assessment taxonomy');
    }
    if (knowledgeGaps.length === 0) {
      knowledgeGaps.push('No critical knowledge gaps detected across tested assessment domains');
    }

    // Dynamic Time Management Diagnostic
    const avgSec = Math.round(timeSpentSeconds / total);
    let timeManagement = '';
    if (avgSec < 15) {
      timeManagement = `The student exhibited an extremely rushed approach on most questions, averaging just ${avgSec} seconds per question, which strongly indicates widespread blind guessing or hurried decision-making. Future attempts should prioritize spending at least 45 to 60 seconds per question to carefully digest prompts.`;
    } else if (avgSec <= 60) {
      timeManagement = `The student maintained a disciplined, balanced pace, averaging ${avgSec} seconds per question. Question review shows steady time investment across both conceptual and applied problems without signs of panic or stall.`;
    } else {
      timeManagement = `The student exhibited extended deliberation, averaging ${avgSec} seconds per question. While thoroughness on intricate scenarios is beneficial, practicing timed evaluations will improve answering confidence and velocity.`;
    }

    // Recommended Remediation Plan
    let remediationPlan = '';
    if (scorePercentage < 60) {
      remediationPlan = `Focus on revisiting core foundational material, starting with ${
        knowledgeGaps.slice(0, 2).map((g) => g.split(' (')[0]).join(' and ') || 'fundamental technical principles'
      }. The student needs to slow down, thoroughly read questions and scenario contexts, and practice identifying how core domain rules apply to practical examples before attempting further assessments.`;
    } else {
      remediationPlan = `Consolidate existing competencies by attempting timed mock examinations with higher question complexity. Focus targeted review on ${
        knowledgeGaps.slice(0, 1).map((g) => g.split(' (')[0])[0] || 'advanced edge-case debugging'
      } to achieve complete domain mastery.`;
    }

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
      proficiencyLevel,
      skillSplit,
      strengths,
      knowledgeGaps,
      timeManagement,
      remediationPlan,
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
