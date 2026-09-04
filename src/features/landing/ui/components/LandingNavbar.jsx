/**
 * @file LandingNavbar.jsx
 * @layer features/landing/ui/components
 * @description Header navigation for the KarmaLearn & Mission Karmayogi landing experience.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Shield, Sparkles, User, ExternalLink } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/authHooks';

export const LandingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Courses', href: '#courses' },
    { label: 'Learning', href: '#governance' },
    { label: 'Competencies', href: '#ranking' },
    { label: 'About', href: '#about-mission' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Government Ribbon */}
      <div className="bg-slate-100 text-slate-700 text-xs border-b border-slate-200/80 px-4 sm:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Ashoka Stambh / Govt Emblem indicator */}
          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="hidden sm:inline">GOVERNMENT OF INDIA</span>
            <span className="sm:hidden">GOI</span>
            <span className="text-slate-300">|</span>
            <span className="text-[11px] text-slate-600 hidden md:inline">
              Ministry of Electronics & Information Technology
            </span>
          </div>
        </div>

        {/* Accessibility & Language Selectors */}
        <div className="flex items-center gap-4 text-[11px]">
          <button className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-500" />
            <span>English</span>
          </button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-900 transition-colors">
            Accessibility
          </button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-900 transition-colors">
            Helpdesk
          </button>
        </div>
      </div>

      {/* Main KarmaLearn Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-sky-600 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              {/* Stylized Lotus / Karmayogi Flame */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                  d="M12 2C12 2 8 8 8 13C8 16.5 10 19 12 22C14 19 16 16.5 16 13C16 8 12 2 12 2Z"
                  fill="#0284C7"
                />
                <path
                  d="M12 7C9.5 9 5 12 5 15.5C5 18.5 7 20.5 9 21.5C9.5 19 11 16 12 14.5"
                  fill="#F59E0B"
                  opacity="0.85"
                />
                <path
                  d="M12 7C14.5 9 19 12 19 15.5C19 18.5 17 20.5 15 21.5C14.5 19 13 16 12 14.5"
                  fill="#EA580C"
                  opacity="0.85"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
              Karma<span className="text-sky-600">Learn</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
              Mission Karmayogi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="hover:text-sky-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Go to Dashboard ({user?.name || 'Officer'})</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 text-xs font-semibold transition-all shadow-2xs"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-xs"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block py-2 text-base font-medium text-slate-800 hover:text-sky-600"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-bold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
