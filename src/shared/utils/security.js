/**
 * @file security.js
 * @layer shared/utils
 * @description Security utilities including input sanitization against XSS,
 * secure token verification, and payload validators.
 */

/**
 * Strips HTML tags and potential script injections from user input strings.
 * @param {string} input - Raw string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Strip < and >
    .replace(/javascript:/gi, '') // Strip javascript: pseudo-protocol
    .trim();
};

/**
 * Validates whether a given token appears structurally well-formed
 * @param {string} token
 * @returns {boolean}
 */
export const isValidTokenFormat = (token) => {
  if (!token || typeof token !== 'string') return false;
  return token.length >= 10;
};
