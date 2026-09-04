/**
 * @file QuesComp.jsx
 * @layer features/quiz/ui/comp
 * @description Presentational question component rendering topic, difficulty badge,
 * prompt text, and interactive option selector.
 */

import React from 'react';
import { Bookmark, CheckCircle2 } from 'lucide-react';
import Badge from '@/shared/ui/Badge';

export const QuesComp = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  isMarked,
  onSelectOption,
  onToggleReview,
  onClearAnswer,
}) => {
  if (!question) {
    return (
      <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-200">
        No active question available.
      </div>
    );
  }

  const difficultyVariant = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  }[question.difficulty] || 'default';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Question Header */}
      <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/40">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge variant={difficultyVariant}>{question.difficulty}</Badge>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            {question.topic}
          </span>
        </div>

        {/* Action icons (Mark for Review & Clear) */}
        <div className="flex items-center gap-2">
          {selectedOption && (
            <button
              onClick={onClearAnswer}
              className="text-xs text-slate-500 hover:text-slate-800 hover:underline px-2 py-1"
            >
              Clear Choice
            </button>
          )}
          <button
            onClick={onToggleReview}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
              isMarked
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isMarked ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="p-6">
        <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
          {question.questionText}
        </p>

        {/* Options List */}
        <div className="mt-6 space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className={`text-sm ${isSelected ? 'font-semibold text-indigo-950' : 'text-slate-700'}`}>
                    {opt.text}
                  </span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuesComp;
