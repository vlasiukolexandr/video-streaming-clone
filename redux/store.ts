import { configureStore } from '@reduxjs/toolkit';

import defaultsSlice from '@/redux/defaults/defaultsSlice';

export const store = configureStore({
  reducer: {
    appDefaults: defaultsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
