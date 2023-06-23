import { User } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentUserState {
  currentUser: User | null
}

const initialState: CurrentUserState = {
  currentUser: null,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clear: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, clear } = currentUserSlice.actions;

export default currentUserSlice.reducer