/**
 * @file mockData.js
 * @description Centralized realistic mock datasets for Auth, Quiz Questions, Quiz Analysis, and Total Analytics.
 * Used across the API layers to simulate backend responses until live services are hooked up.
 */

// Helper function to simulate network latency
export const simulateNetworkDelay = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_USER = {
  id: 'usr_101',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  role: 'Student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  institution: 'National Institute of Technology',
  completedQuizzesCount: 14,
  overallPercentile: 92.4,
};

export const MOCK_QUESTIONS_WITH_ANSWERS = [
  {
    id: 1,
    topic: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    questionText: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (AVL / Red-Black Tree)?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(log n)' },
      { id: 'C', text: 'O(n)' },
      { id: 'D', text: 'O(n log n)' },
    ],
    correctAnswer: 'B',
    explanation: 'In a balanced binary search tree with n nodes, the height of the tree is bounded by O(log n), making search operations O(log n).',
  },
  {
    id: 2,
    topic: 'Web Architecture & Protocols',
    difficulty: 'Easy',
    questionText: 'Which HTTP status code signifies that a client must authenticate itself to get the requested response?',
    options: [
      { id: 'A', text: '400 Bad Request' },
      { id: 'B', text: '401 Unauthorized' },
      { id: 'C', text: '403 Forbidden' },
      { id: 'D', text: '404 Not Found' },
    ],
    correctAnswer: 'B',
    explanation: 'HTTP 401 Unauthorized indicates that the request lacks valid authentication credentials for the target resource.',
  },
  {
    id: 3,
    topic: 'Database Management Systems',
    difficulty: 'Medium',
    questionText: 'In relational databases, which ACID property guarantees that transactions are executed concurrently without inter-transaction interference?',
    options: [
      { id: 'A', text: 'Atomicity' },
      { id: 'B', text: 'Consistency' },
      { id: 'C', text: 'Isolation' },
      { id: 'D', text: 'Durability' },
    ],
    correctAnswer: 'C',
    explanation: 'Isolation ensures that concurrent transactions result in a system state that would be obtained if the transactions were executed sequentially.',
  },
  {
    id: 4,
    topic: 'Operating Systems',
    difficulty: 'Hard',
    questionText: 'Which of the following is NOT one of the necessary Coffman conditions required for a system deadlock to occur?',
    options: [
      { id: 'A', text: 'Mutual Exclusion' },
      { id: 'B', text: 'Hold and Wait' },
      { id: 'C', text: 'Preemption Allowed' },
      { id: 'D', text: 'Circular Wait' },
    ],
    correctAnswer: 'C',
    explanation: 'Deadlock requires "No Preemption" (resources cannot be forcibly reclaimed). "Preemption Allowed" actually prevents deadlocks.',
  },
  {
    id: 5,
    topic: 'Computer Networks',
    difficulty: 'Medium',
    questionText: 'Which transport layer protocol provides connectionless, unreliable datagram service with minimal transmission overhead?',
    options: [
      { id: 'A', text: 'TCP' },
      { id: 'B', text: 'UDP' },
      { id: 'C', text: 'SCTP' },
      { id: 'D', text: 'ICMP' },
    ],
    correctAnswer: 'B',
    explanation: 'UDP (User Datagram Protocol) is connectionless, prioritizing low latency and speed over reliability guarantees.',
  },
];

/**
 * Sanitized questions served to client/test-taker.
 * Strictly omits 'correctAnswer' and 'explanation' to prevent client-side answer sniffing.
 */
export const PUBLIC_QUESTIONS = MOCK_QUESTIONS_WITH_ANSWERS.map(
  ({ id, topic, difficulty, questionText, options }) => ({
    id,
    topic,
    difficulty,
    questionText,
    options,
  })
);

export const MOCK_QUESTIONS = PUBLIC_QUESTIONS;

export const MOCK_SINGLE_ANALYSIS = {
  quizId: 'quiz_tech_assessment_01',
  quizTitle: 'Full-Stack Technical Assessment 2026',
  completedAt: '2026-09-04 10:45 AM',
  totalQuestions: 5,
  correctAnswers: 4,
  incorrectAnswers: 1,
  unattempted: 0,
  scorePercentage: 80,
  totalTimeSpentSeconds: 245, // 4m 05s
  averageTimePerQuestionSeconds: 49,
  accuracy: 80,
  proficiencyLevel: 'Proficient',
  skillSplit: [
    { skill: 'Theoretical', score: 67 },
    { skill: 'Application', score: 100 },
  ],
  strengths: [
    'Data Structures & Algorithms (Balanced Tree Traversal & Big-O Complexity)',
    'Web Architecture & Protocols (HTTP Authentication & Authorization)',
    'Database Management Systems (ACID Transaction Isolation & Concurrency)',
    'Computer Networks (Transport Layer Datagrams & Protocol Efficiency)',
  ],
  knowledgeGaps: [
    'Operating Systems (Coffman Deadlock Conditions & Resource Preemption Rules)',
  ],
  timeManagement:
    'The student exhibited a steady and deliberate pace across 4 out of 5 questions, averaging 49 seconds per question. Deliberation on algorithmic and protocol questions resulted in high accuracy, though the extended time spent on Operating Systems (90 seconds) indicates hesitation regarding non-preemption principles.',
  remediationPlan:
    'Focus on reinforcing Operating Systems concurrency principles, specifically analyzing deadlock prevention mechanisms and the distinction between preemptible and non-preemptible resources before taking advanced systems assessments.',
  categoryBreakdown: [
    { category: 'Data Structures & Algorithms', score: 100, fullMark: 100 },
    { category: 'Web Architecture & Protocols', score: 100, fullMark: 100 },
    { category: 'Database Management Systems', score: 100, fullMark: 100 },
    { category: 'Operating Systems', score: 0, fullMark: 100 },
    { category: 'Computer Networks', score: 100, fullMark: 100 },
  ],
  questionReviews: [
    {
      questionId: 1,
      questionText: 'What is the time complexity of searching for an element in a balanced BST?',
      userAnswer: 'B',
      correctAnswer: 'B',
      isCorrect: true,
      timeSpent: 35,
    },
    {
      questionId: 2,
      questionText: 'Which HTTP status code signifies client must authenticate itself?',
      userAnswer: 'B',
      correctAnswer: 'B',
      isCorrect: true,
      timeSpent: 22,
    },
    {
      questionId: 3,
      questionText: 'Which ACID property guarantees concurrent transaction independence?',
      userAnswer: 'C',
      correctAnswer: 'C',
      isCorrect: true,
      timeSpent: 48,
    },
    {
      questionId: 4,
      questionText: 'Which is NOT one of the necessary Coffman conditions for deadlock?',
      userAnswer: 'B',
      correctAnswer: 'C',
      isCorrect: false,
      timeSpent: 90,
    },
    {
      questionId: 5,
      questionText: 'Which transport layer protocol provides connectionless datagram service?',
      userAnswer: 'B',
      correctAnswer: 'B',
      isCorrect: true,
      timeSpent: 50,
    },
  ],
};

export const MOCK_TOTAL_ANALYSIS = {
  totalQuizzesTaken: 18,
  totalQuestionsAttempted: 190,
  overallAccuracyRate: 84.5,
  averageTimePerQuestion: '42s',
  currentStreakDays: 6,
  percentileRank: 92.4,
  subjectMastery: [
    { subject: 'Algorithms', proficiency: 88, testsCount: 6 },
    { subject: 'System Design', proficiency: 76, testsCount: 4 },
    { subject: 'Database Systems', proficiency: 94, testsCount: 5 },
    { subject: 'Networking', proficiency: 82, testsCount: 3 },
  ],
  performanceTimeline: [
    { date: 'Aug 20', score: 68, average: 65 },
    { date: 'Aug 24', score: 74, average: 67 },
    { date: 'Aug 28', score: 80, average: 70 },
    { date: 'Aug 31', score: 85, average: 72 },
    { date: 'Sep 02', score: 82, average: 71 },
    { date: 'Sep 04', score: 90, average: 73 },
  ],
  weakAreas: [
    { topic: 'OS Concurrency & Deadlocks', accuracy: '45%', recommendation: 'Review Coffman conditions and Peterson’s Algorithm' },
    { topic: 'Dynamic Programming (Grid memoization)', accuracy: '52%', recommendation: 'Practice 2D Matrix DP problems on LeetCode' },
  ],
  strongAreas: [
    { topic: 'SQL & Indexing Mechanics', accuracy: '96%', badge: 'Master' },
    { topic: 'Binary Trees & Traversals', accuracy: '94%', badge: 'Advanced' },
  ],
};
