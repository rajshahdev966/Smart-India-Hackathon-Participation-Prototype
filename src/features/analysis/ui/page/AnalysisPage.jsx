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

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Score Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Score</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{analysis.scorePercentage}%</span>
            <span className="text-xs text-emerald-600 font-semibold">Passed</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {analysis.correctAnswers} of {analysis.totalQuestions} questions correct
          </p>
        </Card>

        {/* Accuracy Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Accuracy</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{analysis.accuracy}%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Overall question precision</p>
        </Card>

        {/* Total Time Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Time Spent</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {Math.floor(analysis.totalTimeSpentSeconds / 60)}m {analysis.totalTimeSpentSeconds % 60}s
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Avg {analysis.averageTimePerQuestionSeconds}s per question
          </p>
        </Card>

        {/* Breakdown Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Result Stats</span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs font-semibold">
            <span className="text-emerald-600">✓ {analysis.correctAnswers} Correct</span>
            <span className="text-rose-600">✕ {analysis.incorrectAnswers} Incorrect</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Zero unattempted items</p>
        </Card>
      </div>

      {/* Visual Chart Card */}
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
