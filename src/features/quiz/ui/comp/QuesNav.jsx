/**
 * @file QuesNav.jsx
 * @layer features/quiz/ui/comp
 * @description Question navigation palette component showing 1..N question matrix,
 * completion status legend, and test submission prompt.
 */

import React from 'react';
import Button from '@/shared/ui/Button';

export const QuesNav = ({
  questions = [],
  currentIndex,
  userAnswers = {},
  markedForReview = [],
  onSelectIndex,
  onSubmitQuiz,
  isSubmitting,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between h-full">
      <div>
        <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
          Question Palette
        </h4>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-emerald-500"></span>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-amber-400"></span>
            <span>Review</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md border-2 border-indigo-600"></span>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-slate-100"></span>
            <span>Not Visited</span>
          </div>
        </div>

        {/* Question Grid Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = !!userAnswers[q.id];
            const isMarked = markedForReview.includes(q.id);

            let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
            if (isMarked) {
              bgClass = 'bg-amber-100 text-amber-900 border border-amber-400 font-semibold';
            } else if (isAnswered) {
              bgClass = 'bg-emerald-600 text-white font-medium';
            }

            const currentRing = isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' : '';

            return (
              <button
                key={q.id}
                onClick={() => onSelectIndex(idx)}
                className={`h-9 rounded-lg text-xs font-medium transition-all ${bgClass} ${currentRing}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submission CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Button
          variant="primary"
          size="md"
          className="w-full"
          isLoading={isSubmitting}
          onClick={onSubmitQuiz}
        >
          Submit Assessment
        </Button>
      </div>
    </div>
  );
};

export default QuesNav;
