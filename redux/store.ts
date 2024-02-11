import { configureStore } from '@reduxjs/toolkit';

import currentUserSlice from '@/redux/user/userSlice';
import defaultsSlice from '@/redux/defaults/defaultsSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    appDefaults: defaultsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
