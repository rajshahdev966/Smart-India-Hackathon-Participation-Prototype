/**
 * @file GeneratedQuizPreview.jsx
 * @layer features/materialUpload/ui/comp
 * @description Renders AI-generated MCQs grounded in uploaded documents with source citations,
 * confidence ratings, and launch triggers into proctored exam mode.
 */

import React, { useState } from 'react';
import { CheckCircle, Sparkles, BookOpen, Play, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '@/shared/ui/Badge';
import Button from '@/shared/ui/Button';

export const GeneratedQuizPreview = ({
  questions = [],
  groundingConfidence = 98,
  sourceSummary = '',
  onLaunchQuiz,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="space-y-6 pt-4 border-t border-slate-200 animate-in fade-in-50">
      {/* AI Grounding Status Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-indigo-50/50 to-emerald-50/50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" size="sm">
              <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
              {groundingConfidence}% AI Grounding Confidence
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              Source Verified
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            AI-Generated Proctored Assessment Ready
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            {sourceSummary || `Generated ${questions.length} questions grounded strictly in your uploaded material.`}
          </p>
        </div>

        <button
          onClick={onLaunchQuiz}
          className="px-6 py-3 rounded-xl bg-[#0F2942] hover:bg-[#1E3A5F] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current text-sky-400" />
          <span>Start Proctored Assessment ({questions.length} Qs)</span>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Grounded Questions Inspection ({questions.length})
          </h4>
          <span className="text-xs text-slate-500">
            Review options &amp; source citations before taking assessment
          </span>
        </div>

        {questions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={q.id || idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
                      {q.topic}
                    </span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {q.questionText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="neutral" size="sm">
                    {q.difficulty}
                  </Badge>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in-50">
                  {/* Options Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const isCorrect = opt.id === q.correctAnswer;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                            isCorrect
                              ? 'bg-emerald-50/70 border-emerald-300 font-semibold text-emerald-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                          {isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Grounded Explanation & Citation */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-800">Grounded Explanation: </span>
                      <span className="text-slate-600">{q.explanation}</span>
                    </div>

                    {q.sourceCitation && (
                      <div className="flex items-center gap-2 text-[11px] text-sky-800 font-semibold pt-1 border-t border-slate-200/60">
                        <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Source Citation: {q.sourceCitation}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneratedQuizPreview;
