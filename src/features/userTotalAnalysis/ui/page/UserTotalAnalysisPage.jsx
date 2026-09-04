/**
 * @file UserTotalAnalysisPage.jsx
 * @layer features/userTotalAnalysis/ui/page
 * @description Comprehensive cumulative analytics dashboard aggregating student performance across all tests,
 * mastery matrices, percentile ranking, and prescriptive recommendations.
 */

import React from 'react';
import {
  TrendingUp,
  Percent,
  CheckCircle,
  Flame,
  AlertOctagon,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useUserTotalAnalysis } from '../../hooks/useUserTotalAnalysis';
import TotalSummaryCard from '../comp/TotalSummaryCard';
import Card, { CardHeader, CardBody } from '@/shared/ui/Card';
import Badge from '@/shared/ui/Badge';

export const UserTotalAnalysisPage = () => {
  const { totalData, isLoading } = useUserTotalAnalysis();

  if (isLoading || !totalData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500">Loading aggregate student analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Cumulative Student Performance Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Holistic assessment metrics and AI-driven skill readiness benchmarks
          </p>
        </div>
        <Badge variant="purple" size="md" className="flex items-center gap-1.5 py-1.5 px-3">
          <Trophy className="w-4 h-4 text-purple-600" />
          <span>Top {100 - Math.round(totalData.percentileRank)}% Nationwide</span>
        </Badge>
      </div>

      {/* Aggregate KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">National Percentile</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalData.percentileRank}th</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Compared across {totalData.totalQuizzesTaken} tests</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Overall Accuracy</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalData.overallAccuracyRate}%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{totalData.totalQuestionsAttempted} total questions solved</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Average Pace</span>
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalData.averageTimePerQuestion}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Consistent execution speed</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Study Streak</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalData.currentStreakDays} Days</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Active continuous learning</p>
        </Card>
      </div>

      {/* Main Timeline Chart */}
      <Card>
        <CardHeader
          title="Performance Progression Timeline"
          subtitle="Your exam score trajectory compared to peer cohort benchmark"
        />
        <CardBody>
          <TotalSummaryCard timelineData={totalData.performanceTimeline} />
        </CardBody>
      </Card>

      {/* Two columns: Subject Mastery vs Weak Areas / Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Mastery */}
        <Card>
          <CardHeader
            title="Subject Mastery Matrix"
            subtitle="Calculated proficiency levels across core modules"
          />
          <CardBody className="space-y-4">
            {totalData.subjectMastery.map((item) => (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{item.subject}</span>
                  <span className="font-bold text-indigo-600">{item.proficiency}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Weak Areas & Targeted Advice */}
        <Card>
          <CardHeader
            title="Targeted Diagnostic Recommendations"
            subtitle="Identified weak concepts requiring focused remediation"
          />
          <CardBody className="space-y-3.5">
            {totalData.weakAreas.map((w, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 flex items-start gap-3"
              >
                <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-rose-950">{w.topic}</span>
                    <Badge variant="danger" size="sm">{w.accuracy} Accuracy</Badge>
                  </div>
                  <p className="text-slate-600 mt-1">{w.recommendation}</p>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Validated Strengths
              </span>
              <div className="flex flex-wrap gap-2">
                {totalData.strongAreas.map((s, index) => (
                  <Badge key={index} variant="success" size="md" className="gap-1 py-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{s.topic} ({s.accuracy})</span>
                  </Badge>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default UserTotalAnalysisPage;
