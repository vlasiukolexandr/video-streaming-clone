import { configureStore } from '@reduxjs/toolkit'

import currentUserSlice from '@/redux/user/userSlice'

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
