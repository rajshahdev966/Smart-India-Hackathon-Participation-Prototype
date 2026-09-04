/**
 * @file DashboardPage.jsx
 * @layer features/dashboard/ui
 * @description KarmaLearn civil services capacity dashboard matching Screenshot 3 UI.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  GraduationCap,
  MessageSquare,
  Calendar,
  Sparkles,
  Network,
  Play,
  UploadCloud,
  Search,
  BookOpen,
  FileCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useAuth } from '@/features/auth/hooks/authHooks';

// Quick action categories from Screenshot 3
const QUICK_CATEGORIES = [
  { id: 'explore', label: 'Explore Content', icon: Compass },
  { id: 'learn', label: 'Learn', icon: GraduationCap },
  { id: 'discuss', label: 'Discuss', icon: MessageSquare },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'agi', label: 'AGI', icon: Sparkles },
  { id: 'network', label: 'Network', icon: Network },
];

// Competency Gaps data for BarChart
const COMPETENCY_GAPS_DATA = [
  { name: 'Data Governance', current: 80, gap: 20 },
  { name: 'Survey Methodology', current: 60, gap: 40 },
  { name: 'Statistical Analysis', current: 70, gap: 30 },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Bharat Chetri';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* ----------------------------------------------------------------- */}
      {/* QUICK CATEGORY PILLS (Screenshot 3 Top Row)                       */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-around flex-wrap gap-4">
          {QUICK_CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full border-2 border-slate-300 group-hover:border-sky-600 bg-slate-50 group-hover:bg-sky-50 flex items-center justify-center text-slate-600 group-hover:text-sky-600 transition-all shadow-2xs">
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-sky-700 transition-colors">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* CLEAN WELCOME HEADING (No dark banner - matching Screenshot 3)     */}
      {/* ----------------------------------------------------------------- */}
      <div className="pt-1 pb-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {userName}!
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Continue your learning journey and strengthen your competencies.
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* MAIN 2-COLUMN GRID (Pick Up & Actions / Recent Tests)              */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Pick up where you left off (Split Card from Screenshot 3) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col md:flex-row">
          {/* Blue Accent Sub-Panel */}
          <div className="bg-[#0284C7] text-white p-6 md:w-44 flex flex-col items-center justify-center text-center shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold leading-tight">
              Pick up where you left off
            </span>
          </div>

          {/* Details & Progress Sub-Panel */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                  IN PROGRESS
                </span>
                <span className="text-xs font-bold text-sky-600">65%</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                Data Interpretation for Official Statistics
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Module: Understanding Statistical Indicators
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-sky-600 rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                ></div>
              </div>
            </div>

            <div className="mt-6 pt-3 flex justify-end">
              <Link to="/quiz">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#1E3A5F] text-white text-xs font-bold shadow-xs transition-colors">
                  <span>Continue Learning</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions & Recent MCQ Tests */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              QUICK ACTIONS
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 text-xs font-semibold text-slate-700 transition-all">
                <UploadCloud className="w-4 h-4 text-sky-600" />
                <span>Upload Material</span>
              </button>
              <a
                href="/#courses"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 text-xs font-semibold text-slate-700 transition-all"
              >
                <Search className="w-4 h-4 text-sky-600" />
                <span>Browse Catalog</span>
              </a>
            </div>
          </div>

          {/* Recent MCQ Tests */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Recent MCQ Tests
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span className="font-semibold text-slate-800">
                    Statistical Data Quality Knowledge Test
                  </span>
                </div>
                <span className="font-bold text-sky-700 text-xs">10/20</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="font-semibold text-slate-800">
                    Data Visualization Pre-assessment
                  </span>
                </div>
                <span className="font-bold text-amber-700 text-xs">8/20</span>
              </div>
            </div>

            <div className="mt-3 pt-2">
              <Link to="/quiz" className="w-full block">
                <button className="w-full py-2 rounded-lg border border-sky-600 text-sky-700 hover:bg-sky-50 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                  <span>Start New Test</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* MY COURSES & COMPETENCY GAPS                                      */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">My Courses</h3>
              <a href="/#courses" className="text-xs font-semibold text-sky-600 hover:underline">
                View All
              </a>
            </div>

            <div className="space-y-3.5">
              {/* Course 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800">
                    Statistical Data Quality &amp; Validation
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Core Competency</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span>Progress</span>
                  <span className="font-bold text-slate-700">40%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              {/* Course 2 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800">
                    Digital Governance &amp; Official Statistics
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Advanced</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span>Progress</span>
                  <span className="font-bold text-slate-700">15%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competency Gaps in Official Statistical System (Bar Chart) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 mb-3 gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Competency Gaps in Official Statistical System
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                <span className="text-slate-600 font-medium">Current State</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                <span className="text-slate-600 font-medium">Target Gap</span>
              </div>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPETENCY_GAPS_DATA} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis unit="%" tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  formatter={(val, name) => [
                    `${val}%`,
                    name === 'current' ? 'Current State' : 'Target Gap',
                  ]}
                />
                <Bar dataKey="current" fill="#0284C7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gap" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-2">
            Based on recent assessments, focus is needed on <strong>Survey Methodology</strong> to meet target competency levels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
