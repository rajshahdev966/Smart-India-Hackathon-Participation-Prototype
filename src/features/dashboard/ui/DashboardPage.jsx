/**
 * @file DashboardPage.jsx
 * @layer features/dashboard/ui
 * @description Central dashboard landing page summarizing ongoing modules, quick assessment launcher,
 * and current performance badges.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, ArrowRight, CheckCircle2, Clock, BarChart2 } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/authHooks';
import { useCourseContext } from '@/context/CourseContext';
import Card, { CardHeader, CardBody } from '@/shared/ui/Card';
import Button from '@/shared/ui/Button';
import Badge from '@/shared/ui/Badge';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { courses, selectedCourse, setSelectedCourse } = useCourseContext();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-8 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="purple" size="md" className="bg-white/20 text-white border-white/30 mb-3">
            SIH 2026 Academic Portal
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="mt-2 text-indigo-100 text-sm leading-relaxed">
            Your technical aptitude assessment track is 78% completed. Take today’s benchmark
            assessment to evaluate your system design & data structures proficiency.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/quiz">
              <Button
                variant="secondary"
                size="md"
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold shadow-sm"
              >
                <span>Launch Assessment</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/total-analysis">
              <Button
                variant="ghost"
                size="md"
                className="text-white hover:bg-white/15 border border-white/20"
              >
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Course Track Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Curriculum Modules</h2>
            <p className="text-xs text-slate-500">Select a course track to focus your testing focus</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course) => {
            const isSelected = selectedCourse?.id === course.id;
            return (
              <Card
                key={course.id}
                hoverable
                onClick={() => setSelectedCourse(course)}
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-indigo-600 border-indigo-600 shadow-sm' : ''
                }`}
              >
                <CardBody className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs text-indigo-600 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-3 text-sm">
                    {course.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <span>{course.totalTests} Practice Quizzes</span>
                    <span className="text-indigo-600 font-medium hover:underline">Select Track</span>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hoverable className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Start Timed Quiz</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Experience realistic exam simulation with real-time countdown, question review tags,
                and randomized options.
              </p>
              <Link to="/quiz" className="mt-4 inline-block">
                <Button variant="primary" size="sm">
                  Start Examination
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card hoverable className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Review Diagnostics</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Inspect AI-driven insights, accuracy rates, and time allocation across computer science
                concepts.
              </p>
              <Link to="/analysis" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  View Latest Report
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
