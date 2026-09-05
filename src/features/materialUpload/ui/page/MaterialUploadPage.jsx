/**
 * @file MaterialUploadPage.jsx
 * @layer features/materialUpload/ui/page
 * @description Page view for learning material processing and grounded AI MCQ generation
 * adhering to AGENTS.md requirements for India's Official Statistical System.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Sparkles,
  Bot,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { useMaterialUpload } from '../../hooks/useMaterialUpload';
import FileDropzone from '../comp/FileDropzone';
import GeneratedQuizPreview from '../comp/GeneratedQuizPreview';
import Badge from '@/shared/ui/Badge';
import Button from '@/shared/ui/Button';

export const MaterialUploadPage = () => {
  const {
    uploadedFile,
    extractedText,
    wordCount,
    isExtracting,
    isGenerating,
    generatedQuestions,
    groundingConfidence,
    sourceSummary,
    error,
    processFile,
    generateQuestions,
    launchAssessment,
    reset,
  } = useMaterialUpload();

  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');

  const handleGenerate = () => {
    generateQuestions({ questionCount, difficulty });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="md">
              <Bot className="w-3.5 h-3.5 mr-1" />
              iGOT Karmayogi AI Engine
            </Badge>
            <span className="text-xs text-slate-400 font-semibold">•</span>
            <span className="text-xs font-semibold text-sky-700">
              Capacity Building for Official Statistics
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Learning Material Processing &amp; AI Quiz Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload institutional guidelines, statistical manuals, or policy papers to generate grounded assessments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {uploadedFile && (
            <Button variant="outline" size="sm" icon={RotateCcw} onClick={reset}>
              Upload Different File
            </Button>
          )}
          <Link to="/quiz">
            <Button variant="secondary" size="sm">
              Standard Assessment
            </Button>
          </Link>
        </div>
      </div>

      {/* Upload Box Container */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            1. Upload Learning Document
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Content is validated for strict format adherence and sanitized against script injection.
          </p>
        </div>

        <FileDropzone
          onFileSelect={processFile}
          isProcessing={isExtracting}
          uploadedFile={uploadedFile}
          error={error}
        />

        {/* Extracted Document Preview */}
        {extractedText && (
          <div className="pt-4 border-t border-slate-100 space-y-3 animate-in fade-in-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-800">
                  Extracted Content Preview ({wordCount} words)
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Ready for AI Processing
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {extractedText}
            </div>
          </div>
        )}
      </div>

      {/* AI Assessment Generation Controls */}
      {extractedText && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6 animate-in fade-in-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              2. Configure AI Assessment Generation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify question quantity and cognitive difficulty. All questions are strictly grounded in the document above.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Question Count Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Number of MCQs
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      questionCount === num
                        ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {num} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Easy', 'Medium', 'Hard'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      difficulty === lvl
                        ? 'bg-[#0F2942] text-white border-[#0F2942] shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Button */}
            <div className="flex flex-col justify-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Grounded Generation in Progress...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Grounded MCQs</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Grounding Criteria Checklist matching AGENTS.md */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Single unambiguous correct answer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Explicit source citations provided</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Zero unverified synthetic hallucinations</span>
            </div>
          </div>
        </div>
      )}

      {/* Generated Quiz Section */}
      <GeneratedQuizPreview
        questions={generatedQuestions}
        groundingConfidence={groundingConfidence}
        sourceSummary={sourceSummary}
        onLaunchQuiz={launchAssessment}
      />
    </div>
  );
};

export default MaterialUploadPage;
