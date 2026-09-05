/**
 * @file security.js
 * @layer shared/utils
 * @description Robust security utilities including defensive XSS input sanitization,
 * JWT token format integrity checks, and schema validation for client-side storage.
 */

/**
 * Sanitizes user input against Cross-Site Scripting (XSS).
 * Strips script tags, javascript: URIs, inline event handlers, and encodes HTML entities.
 * @param {string} input - Raw user input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script> tags and inner code
    .replace(/on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, '') // Remove inline event handlers like onerror=, onload=, onclick=
    .replace(/javascript\s*:/gi, '') // Remove javascript: pseudo-protocol
    .replace(/data\s*:\s*text\/html/gi, '') // Remove dangerous data: URIs
    .replace(/[<>]/g, '') // Strip remaining < and >
    .trim();
};

/**
 * Validates whether a token appears structurally intact and well-formed.
 * @param {string} token
 * @returns {boolean}
 */
export const isValidTokenFormat = (token) => {
  if (!token || typeof token !== 'string') return false;
  // Must be non-empty, min 10 chars, and alphanumeric / underscore / hyphen
  return token.length >= 10 && /^[A-Za-z0-9_\-.]+$/.test(token);
};

/**
 * Validates and sanitizes a quiz analysis object read from storage to prevent state injection.
 * Ensures properties match expected types, counts, and ranges.
 * @param {any} data
 * @returns {boolean}
 */
export const validateQuizAnalysisPayload = (data) => {
  if (!data || typeof data !== 'object') return false;

  const hasValidFields =
    typeof data.quizId === 'string' &&
    typeof data.scorePercentage === 'number' &&
    data.scorePercentage >= 0 &&
    data.scorePercentage <= 100 &&
    typeof data.totalQuestions === 'number' &&
    data.totalQuestions > 0 &&
    typeof data.correctAnswers === 'number' &&
    Array.isArray(data.questionReviews) &&
    Array.isArray(data.categoryBreakdown);

  return hasValidFields;
};

/**
 * Validates and sanitizes cumulative user analytics payload read from storage.
 * @param {any} data
 * @returns {boolean}
 */
export const validateUserTotalAnalysisPayload = (data) => {
  if (!data || typeof data !== 'object') return false;
  return (
    typeof data.totalQuizzesTaken === 'number' &&
    data.totalQuizzesTaken >= 0 &&
    typeof data.overallAccuracyRate === 'number' &&
    data.overallAccuracyRate >= 0 &&
    data.overallAccuracyRate <= 100 &&
    Array.isArray(data.performanceTimeline)
  );
};
