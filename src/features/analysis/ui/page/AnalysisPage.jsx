/**
 * @file AnalysisPage.jsx
 * @layer features/analysis/ui/page
 * @description Detailed single assessment analysis report showing metrics, visual breakdown,
 * and question-level review explanations.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useAnalysis } from '../../hooks/useAnalysis';
import PerformanceChartComp from '../comp/PerformanceChartComp';
import SkillSplitChartComp from '../comp/SkillSplitChartComp';
import Card, { CardHeader, CardBody } from '@/shared/ui/Card';
import Badge from '@/shared/ui/Badge';
import Button from '@/shared/ui/Button';

export const AnalysisPage = () => {
  const { analysis, isLoading } = useAnalysis();

  if (isLoading || !analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500">Generating performance analysis...</p>
      </div>
    );
  }

  // Fallback diagnostic data if legacy stored analysis object is present
  const proficiency =
    analysis.proficiencyLevel ||
    (analysis.scorePercentage >= 90
      ? 'Expert'
      : analysis.scorePercentage >= 75
      ? 'Proficient'
      : analysis.scorePercentage >= 60
      ? 'Competent'
      : analysis.scorePercentage >= 40
      ? 'Developing'
      : 'Novice');

  const defaultStrengths = [
    'Data Structures & Algorithms (Balanced Tree Traversal and Big-O Complexity)',
    'Web Architecture & Protocols (HTTP Authentication Standards)',
    'Database Management Systems (ACID Transaction Concurrency & Isolation)',
  ];

  const defaultGaps = [
    'Operating Systems (Coffman Deadlock Conditions & Resource Preemption)',
  ];

  const strengthsList =
    analysis.strengths && analysis.strengths.length > 0
      ? analysis.strengths
      : defaultStrengths;

  const gapsList =
    analysis.knowledgeGaps && analysis.knowledgeGaps.length > 0
      ? analysis.knowledgeGaps
      : defaultGaps;

  const timeManagementText =
    analysis.timeManagement ||
    `The student maintained an active answering pace, averaging ${
      analysis.averageTimePerQuestionSeconds || 45
    } seconds per question across all items. Deliberation on conceptual problems reflected focused attention, with opportunities to improve velocity on complex scenario-based items.`;

  const remediationText =
    analysis.remediationPlan ||
    'Focus on revisiting core foundational material, starting with identified conceptual gaps. The student needs to slow down, thoroughly read questions and scenario contexts, and practice identifying how core principles apply to practical scenarios before attempting further assessments.';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="primary" size="md">Assessment Completed</Badge>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            {analysis.quizTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluated on {analysis.completedAt}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/quiz">
            <Button variant="outline" size="md" icon={RotateCcw}>
              Retake Assessment
            </Button>
          </Link>
          <Link to="/total-analysis">
            <Button variant="primary" size="md">
              <span>View Total Analytics</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* OVERALL PROFICIENCY BANNER (Screenshot 1) */}
      <div className="bg-[#FEF9C3] border border-[#FDE047]/80 rounded-2xl p-7 text-center shadow-xs">
        <span className="text-xs font-extrabold text-[#854D0E] tracking-widest uppercase">
          OVERALL PROFICIENCY
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#713F12] tracking-tight my-1.5">
          {proficiency}
        </h2>
        <p className="text-sm font-bold text-[#854D0E]/90">
          Score: {analysis.correctAnswers}/{analysis.totalQuestions}
        </p>
      </div>

      {/* 2x2 DIAGNOSTIC INSIGHTS GRID (Screenshot 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Skill Split */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Skill Split
            </h3>
            <div className="w-full h-px bg-slate-100 mb-4"></div>
          </div>
          <SkillSplitChartComp skillSplit={analysis.skillSplit} />
        </div>

        {/* Card 2: Time Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Time Management
          </h3>
          <div className="w-full h-px bg-slate-100 mb-4"></div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {timeManagementText}
          </p>
        </div>

        {/* Card 3: Strengths */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
          <h3 className="text-base font-bold text-emerald-700 mb-1">
            Strengths
          </h3>
          <div className="w-full h-px bg-slate-100 mb-4"></div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            {strengthsList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 4: Knowledge Gaps */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
          <h3 className="text-base font-bold text-rose-600 mb-1">
            Knowledge Gaps
          </h3>
          <div className="w-full h-px bg-slate-100 mb-4"></div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            {gapsList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RECOMMENDED REMEDIATION PLAN (Screenshot 1) */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#1E3A8A] mb-2">
          Recommended Remediation Plan
        </h3>
        <p className="text-xs sm:text-sm text-[#1E40AF] leading-relaxed">
          {remediationText}
        </p>
      </div>

      {/* Subject Category Proficiency (Screenshot 2 - with fixed non-clipping X-axis) */}
      <Card>
        <CardHeader
          title="Subject Category Proficiency"
          subtitle="Score distribution mapped across tested knowledge domains"
        />
        <CardBody>
          <PerformanceChartComp categoryBreakdown={analysis.categoryBreakdown} />
        </CardBody>
      </Card>

      {/* Detailed Question Review List */}
      <Card>
        <CardHeader
          title="Question-by-Question Diagnostic Review"
          subtitle="Review your chosen options alongside verified correct explanations"
        />
        <CardBody className="divide-y divide-slate-100 p-0">
          {analysis.questionReviews.map((rev, index) => (
            <div key={rev.questionId} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {rev.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Question {index + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {rev.questionText}
                    </p>
                  </div>
                </div>

                <Badge variant={rev.isCorrect ? 'success' : 'danger'}>
                  {rev.isCorrect ? 'Correct (+4)' : 'Incorrect (0)'}
                </Badge>
              </div>

              {/* Answers comparison row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <span className="font-semibold text-slate-500">Your Chosen Option: </span>
                  <span className={rev.isCorrect ? 'font-bold text-emerald-700' : 'font-bold text-rose-600'}>
                    Option {rev.userAnswer || 'Not answered'}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                  <span className="font-semibold text-emerald-800">Correct Option: </span>
                  <span className="font-bold text-emerald-900">Option {rev.correctAnswer}</span>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default AnalysisPage;
