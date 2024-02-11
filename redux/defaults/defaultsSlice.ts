import { fallbackLng } from '@/app/i18n/settings';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Session } from 'next-auth';

export interface DefaultAppState {
  lng: string;
  sessionData: Session | null;
}

const initialState: DefaultAppState = {
  lng: fallbackLng,
  sessionData: null,
}

export const defaultsSlice = createSlice({
  name: 'appDefaults',
  initialState,
  reducers: {
    setLng: (state, action: PayloadAction<string>) => {
      state.lng = action.payload;
    },
    clearLng: (state) => {
      state.lng = fallbackLng;
    },
  },
});

export const { setLng, clearLng } = defaultsSlice.actions;

export default defaultsSlice.reducer