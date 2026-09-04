/**
 * @file LandingPage.jsx
 * @layer features/landing/ui
 * @description Master landing page for KarmaLearn & Mission Karmayogi civil services portal.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  FileText,
  Building2,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  BrainCircuit,
  Landmark,
  Laptop,
  CheckCircle,
  ExternalLink,
  Smartphone,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';
import LandingNavbar from './components/LandingNavbar';
import IndiaMap from './components/IndiaMap';
import {
  STATS_DATA,
  GOVERNANCE_CARDS,
  REGIONS_RANKING,
  NATIONAL_ASPIRATIONS,
  SHOWCASED_COURSES,
} from '../data/landingData';

export const LandingPage = () => {
  const [selectedState, setSelectedState] = useState(REGIONS_RANKING[0]);
  const [showAllStates, setShowAllStates] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <LandingNavbar />

      {/* ---------------------------------------------------- */}
      {/* HERO SECTION                                         */}
      {/* ---------------------------------------------------- */}
      <section id="hero" className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20 bg-[#FDFBF7]">
        {/* Subtle background ornamentation */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-300 bg-sky-50/80 text-sky-800 text-[11px] font-bold tracking-wider uppercase">
                <Landmark className="w-3.5 h-3.5 text-sky-600" />
                <span>National Platform for Capacity Building</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Empowering India's Workforce Through{' '}
                <span className="text-sky-700">
                  Competency-Led
                </span>{' '}
                Learning
              </h1>

              {/* Subtitle Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                KarmaLearn is the national platform for continuous capacity building, transitioning
                from rule-based to role-based governance to build a future-ready civil service.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0F2942] hover:bg-[#1E3A5F] text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold shadow-2xs transition-all"
                >
                  <span>Start Learning</span>
                  <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Integrated with iGOT Karmayogi & Parichay Single Sign-On</span>
              </div>
            </div>

            {/* Right Hero Image (Official Portrait Visual) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-50 group">
                <img
                  src="/pm-modi.png"
                  alt="Honorable Prime Minister Narendra Modi"
                  className="w-full h-auto object-cover object-top aspect-[4/4.5] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-bold text-sm">Honorable Prime Minister Narendra Modi</div>
                  <div className="text-[11px] text-amber-200">
                    "Capacity building of civil servants is pivotal for a Viksit Bharat by 2047"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* STATS BANNER                                         */}
      {/* ---------------------------------------------------- */}
      <section className="bg-[#0B2545] text-white py-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {STATS_DATA.map((stat) => (
              <div key={stat.label} className="p-3 border-r last:border-r-0 border-white/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 font-semibold text-xs sm:text-sm text-sky-200">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* MISSION KARMAYOGI HEADER BANNER (From Screenshot 1)  */}
      {/* ---------------------------------------------------- */}
      <section id="about-mission" className="bg-[#F8EFE4] border-b border-amber-200/70 py-10 relative overflow-hidden">
        {/* Subtle circular ripples */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full border border-amber-300/50 pointer-events-none"></div>
        <div className="absolute -right-36 -bottom-36 w-[480px] h-[480px] rounded-full border border-amber-300/30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Mission Karmayogi Logo Banner */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-3 bg-white/90 border border-amber-200 rounded-full px-4 py-2 shadow-xs">
                {/* Flame Lotus Emblem */}
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-base">🪷</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    कर्मयोगी भारत
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-amber-800 tracking-wider">
                    — लोकहितं मम करणीयम् —
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  ABOUT KARMAYOGI BHARAT
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Mission Karmayogi
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The <strong>National Programme for Civil Services Capacity Building (NPCSCB)</strong> – 
                  Mission Karmayogi is a transformative initiative aimed at building a competent civil 
                  service deeply rooted in Indian ethos. The mission emphasizes a shared understanding of 
                  India's priorities, with civil servants working in harmony to ensure effective and 
                  efficient public service delivery.
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Mission Karmayogi focuses on empowering the civil service to thrive in dynamic 
                  environments, addressing the evolving needs of governance and enhancing 
                  government-citizen interaction.
                </p>
              </div>
            </div>

            {/* Officer & Mobile App Mockup Visual */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Officer working with analytics desk graphic */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-300/80 shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=500&q=80"
                  alt="Civil Servant analyzing official reports"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Smartphone mockup showcasing app */}
              <div className="w-32 sm:w-36 bg-slate-900 rounded-[28px] p-2 shadow-xl border-2 border-slate-700 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="bg-white rounded-[20px] p-2 text-center flex flex-col items-center justify-center aspect-[9/18]">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                    <span className="text-xl">🪷</span>
                  </div>
                  <div className="text-[9px] font-bold text-slate-900">कर्मयोगी भारत</div>
                  <div className="text-[7px] text-slate-500 mt-1">iGOT Learning App</div>
                  <div className="mt-3 px-2 py-1 rounded bg-sky-600 text-white text-[8px] font-semibold">
                    Open App
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SHAPING THE FUTURE OF GOVERNANCE                     */}
      {/* ---------------------------------------------------- */}
      <section id="governance" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shaping the Future of Governance
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Transforming bureaucratic learning paradigms through role-specific competencies and
              democratized digital access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Rule to Role-Based Learning */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="bg-[#0B2545] text-white px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-base sm:text-lg">
                  {GOVERNANCE_CARDS.ruleToRole.title}
                </h3>
                <span className="text-xs bg-sky-700/60 px-2.5 py-1 rounded-full text-sky-100 font-medium">
                  Competency
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {GOVERNANCE_CARDS.ruleToRole.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {GOVERNANCE_CARDS.ruleToRole.metrics.map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
                    >
                      <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Democratized Learning */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="bg-[#0284C7] text-white px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-base sm:text-lg">
                  {GOVERNANCE_CARDS.democratized.title}
                </h3>
                <span className="text-xs bg-sky-900/40 px-2.5 py-1 rounded-full text-sky-100 font-medium">
                  Scale & Access
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {GOVERNANCE_CARDS.democratized.description}
                </p>

                <div className="space-y-4">
                  {GOVERNANCE_CARDS.democratized.metrics.map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                      </div>
                      <span className="text-xl font-extrabold text-[#0284C7]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* PROGRESS & RANKING (MAP & LEADERBOARD)               */}
      {/* ---------------------------------------------------- */}
      <section id="ranking" className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Progress &amp; Ranking
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                National overview of competency adoption and completion rates across states and
                union territories.
              </p>
            </div>
            <button
              onClick={() => setShowAllStates(!showAllStates)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold shadow-2xs self-start sm:self-auto transition-all"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>{showAllStates ? 'Hide Full Table' : 'View Detailed Report'}</span>
            </button>
          </div>

          {/* Map + Top Performing Regions Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive India Map */}
            <div className="lg:col-span-7">
              <IndiaMap
                onSelectState={(state) => setSelectedState(state)}
                selectedStateId={selectedState?.id}
              />
            </div>

            {/* Top Performing Regions Leaderboard */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-amber-100 text-amber-700">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Top Performing Regions
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Ranked by score</span>
              </div>

              {/* State Leaderboard Items */}
              <div className="space-y-3.5">
                {REGIONS_RANKING.slice(0, showAllStates ? 10 : 5).map((region, idx) => {
                  const isSelected = selectedState?.id === region.id;
                  return (
                    <div
                      key={region.id}
                      onClick={() => setSelectedState(region)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/50 shadow-2xs'
                          : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <span className="w-5 text-slate-400 font-bold">{idx + 1}</span>
                          <span>{region.name}</span>
                        </div>
                        <span
                          className={`font-bold ${
                            region.rate >= 80
                              ? 'text-emerald-600'
                              : region.rate >= 50
                              ? 'text-amber-600'
                              : 'text-orange-600'
                          }`}
                        >
                          {region.rate}%
                        </span>
                      </div>

                      {/* Progress Bar Indicator */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            region.rate >= 80
                              ? 'bg-emerald-500'
                              : region.rate >= 50
                              ? 'bg-amber-500'
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${region.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Toggle expand button */}
              <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowAllStates(!showAllStates)}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-colors"
                >
                  {showAllStates ? 'Show Top 5 Only' : 'View All States'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SHARED NATIONAL ASPIRATIONS                          */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 bg-[#FDF8F3] border-t border-amber-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shared National Aspirations
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Empowering civil servants through continuous capability building to deliver
              citizen-centric governance and build a future-ready nation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NATIONAL_ASPIRATIONS.map((aspiration) => {
              const IconComponent =
                aspiration.icon === 'BrainCircuit'
                  ? BrainCircuit
                  : aspiration.icon === 'Landmark'
                  ? Landmark
                  : aspiration.icon === 'Laptop'
                  ? Laptop
                  : TrendingUp;

              return (
                <div
                  key={aspiration.id}
                  className="bg-white rounded-xl border border-amber-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">
                      {aspiration.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {aspiration.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SHOWCASED COURSES                                    */}
      {/* ---------------------------------------------------- */}
      <section id="courses" className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Showcased Courses
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Highly recommended programs for capability enhancement across core functional domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOWCASED_COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
              >
                {/* Course Thumbnail Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F2942]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded">
                    {course.tag}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-sky-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                    <Link
                      to="/login"
                      className="font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                    >
                      <span>View Course</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* FOOTER                                               */}
      {/* ---------------------------------------------------- */}
      <footer className="bg-[#0B2545] text-white border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
            {/* Portal Branding */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-white text-sm">
                  KL
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Karma<span className="text-sky-400">Learn</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                National Education Portal dedicated to building a future-ready civil service through
                continuous learning and competency development.
              </p>
              <div className="pt-2 text-xs text-sky-300 font-medium">
                Mission Karmayogi Bharat | NPCSCB
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#hero" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><Link to="/quiz" className="hover:text-white transition-colors">Assessments</Link></li>
              </ul>
            </div>

            {/* Information Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
                Information
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#about-mission" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#governance" className="hover:text-white transition-colors">Frameworks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help & FAQ</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
            <div>
              © 2024 KarmaLearn. National Education Portal. All rights reserved.
            </div>
            <div className="mt-3 sm:mt-0 flex items-center gap-4 text-[11px]">
              <span>Government of India</span>
              <span>•</span>
              <span>Ministry of Electronics &amp; IT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
