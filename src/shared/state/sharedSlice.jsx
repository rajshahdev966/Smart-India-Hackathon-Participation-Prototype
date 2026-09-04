/**
 * @file sharedSlice.jsx
 * @layer shared/state
 * @description Redux slice for common application state (e.g. system theme, active network status, modals).
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  isOnline: true,
  activeModal: null,
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { setTheme, setOnlineStatus, openModal, closeModal } = sharedSlice.actions;
export const selectSharedTheme = (state) => state.shared?.theme;
export const selectIsOnline = (state) => state.shared?.isOnline;

export default sharedSlice.reducer;
