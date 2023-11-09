import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User,UserState } from '@/types';

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    clearUser: (state) => {
      state.user = null;
      state.status = 'idle';
    },
    setStatus: (state, action: PayloadAction<UserState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setStatus, setError } = userSlice.actions;
export default userSlice.reducer;
