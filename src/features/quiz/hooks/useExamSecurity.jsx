/**
 * @file useExamSecurity.jsx
 * @layer features/quiz/hooks
 * @description Dedicated security and anti-cheating hook for assessments.
 * Monitors tab switching with mount grace period, blocks copy/paste and right-clicks,
 * manages fullscreen mode, and guards against accidental navigation without locking out user.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

const MAX_ALLOWED_VIOLATIONS = 3;

export const useExamSecurity = ({ isExamActive = true }) => {
  const [violations, setViolations] = useState(0);
  const [securityAlert, setSecurityAlert] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  // Grace period ref to prevent false positives while route is transitioning
  const isGracePeriodOver = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      isGracePeriodOver.current = true;
    }, 2000);

    return () => {
      clearTimeout(timer);
      isGracePeriodOver.current = false;
    };
  }, []);

  // Handler for integrity violation
  const recordViolation = useCallback(
    (reason) => {
      if (!isExamActive || !isGracePeriodOver.current) return;

      setViolations((prevCount) => {
        const nextCount = prevCount + 1;

        // Schedule security alert outside render phase
        setTimeout(() => {
          setSecurityAlert({
            message: `Proctoring Notice (${nextCount} violation${nextCount > 1 ? 's' : ''}): ${reason}`,
            timestamp: new Date().toLocaleTimeString(),
            severity: nextCount >= MAX_ALLOWED_VIOLATIONS ? 'critical' : 'warning',
          });
        }, 0);

        return nextCount;
      });
    },
    [isExamActive]
  );

  const dismissAlert = () => setSecurityAlert(null);

  // Fullscreen toggle helpers
  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.warn('Fullscreen request denied or not supported:', err);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Exit fullscreen error:', err);
    }
  };

  useEffect(() => {
    if (!isExamActive) return;

    // 1. Tab switch and window minimize detection via visibility API
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        recordViolation('Browser tab switch or window minimize detected.');
      }
    };

    // 2. Prevent Copy, Cut, and Paste
    const handleClipboard = (e) => {
      e.preventDefault();
      setSecurityAlert({
        message: 'Clipboard actions (Copy/Cut/Paste) are blocked during assessment mode.',
        timestamp: new Date().toLocaleTimeString(),
        severity: 'info',
      });
    };

    // 3. Prevent accidental tab close or page reload
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'You have an active examination in progress. Answers may be lost.';
      return e.returnValue;
    };

    // 4. Track fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleClipboard);
    document.addEventListener('cut', handleClipboard);
    document.addEventListener('paste', handleClipboard);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleClipboard);
      document.removeEventListener('cut', handleClipboard);
      document.removeEventListener('paste', handleClipboard);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isExamActive, recordViolation]);

  return {
    violations,
    maxViolations: MAX_ALLOWED_VIOLATIONS,
    securityAlert,
    dismissAlert,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
};

export default useExamSecurity;
