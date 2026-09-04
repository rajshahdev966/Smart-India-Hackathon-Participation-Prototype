/**
 * @file AppContext.jsx
 * @description Global application context managing UI shell state such as mobile sidebar visibility,
 * global notifications, and theme settings.
 */

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

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
