/**
 * @file AppContext.jsx
 * @description Global application context managing UI shell state such as mobile sidebar visibility,
 * global notifications, and theme settings.
 */

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    courses: 'Courses',
    learning: 'My Learning',
    assessments: 'Assessments',
    competency: 'Competency',
    upload: 'AI Generator',
    uploadMaterial: 'Upload Material',
    startTest: 'Start New Test',
    welcome: 'Welcome back',
    learningJourney: 'Continue your learning journey and strengthen your competencies.',
    languageName: 'English',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    courses: 'पाठ्यक्रम',
    learning: 'मेरा अध्ययन',
    assessments: 'मूल्यांकन',
    competency: 'क्षमताएं',
    upload: 'एआई जनरेटर',
    uploadMaterial: 'सामग्री अपलोड करें',
    startTest: 'नया परीक्षण शुरू करें',
    welcome: 'स्वागत है',
    learningJourney: 'अपनी सीखने की यात्रा जारी रखें और अपनी क्षमताओं को सुदृढ़ करें।',
    languageName: 'हिंदी',
  },
};

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const notify = (message, type = 'info') => {
    setActiveNotification({ message, type, id: Date.now() });
    setTimeout(() => setActiveNotification(null), 4000);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        activeNotification,
        notify,
        language,
        toggleLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
