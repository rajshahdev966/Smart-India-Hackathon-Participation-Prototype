/**
 * @file CourseContext.jsx
 * @description Context managing active course modules, subjects, and curriculum tracks for assessments.
 */

import React, { createContext, useContext, useState } from 'react';

const DEFAULT_COURSES = [
  { id: 'cs_core', title: 'Computer Science Fundamentals', code: 'CS-2026', totalTests: 12 },
  { id: 'web_eng', title: 'Full Stack & Web Engineering', code: 'WE-301', totalTests: 8 },
  { id: 'data_sys', title: 'Data Systems & Cloud Arch', code: 'DS-405', totalTests: 6 },
];

const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const [courses] = useState(DEFAULT_COURSES);
  const [selectedCourse, setSelectedCourse] = useState(DEFAULT_COURSES[0]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        selectedCourse,
        setSelectedCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

export default CourseContext;
