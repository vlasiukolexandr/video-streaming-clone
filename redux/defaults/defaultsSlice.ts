import { fallbackLng } from '@/app/i18n/settings';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DefaultAppState {
  lng: string;

  modalMovieId?: string;
  isModalOpen?: boolean;
}

const initialState: DefaultAppState = {
  lng: fallbackLng,

  modalMovieId: '',
  isModalOpen: false,
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

    openModal: (state, action: PayloadAction<{modalMovieId: string}>) => {
      state.isModalOpen = true;
      state.modalMovieId = action.payload.modalMovieId;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    }
  },
});

export const { setLng, clearLng, openModal, closeModal } = defaultsSlice.actions;

export default defaultsSlice.reducer