/**
 * @file AppLayout.jsx
 * @layer app/layout
 * @description Master root layout wrapping application routes with Redux Provider
 * and hierarchical React Context Providers (AppContext, CourseContext, QuizContext).
 */

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/app/store/authStore';
import { AppProvider } from '@/context/AppContext';
import { CourseProvider } from '@/context/CourseContext';
import { QuizProvider } from '@/context/QuizContext';

export const AppLayout = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <AppProvider>
        <CourseProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </CourseProvider>
      </AppProvider>
    </ReduxProvider>
  );
};

export default AppLayout;
