import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoadStatus, UserClient, UserState } from '@/types';

import { setOrganizations } from './organizations';

const initialState: UserState = {
  user: null,
  status: LoadStatus.IDLE,
  error: null,
  organization: null,
};

// add redux thunk to handle async actions
// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#async-logic-and-data-fetching
export const fetchUser = () => async (dispatch: any) => {
  try {
    const res = await fetch('/api/auth');
    const data = await res.json();
    dispatch(setUser(data?.user));
    dispatch(setOrganizations(data?.organizations));
  } catch (err: any) {
    dispatch(setError(err.toString()));
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserClient>) => {
      state.user = action.payload;
      state.status = LoadStatus.SUCCEEDED;
    },
    clearUser: (state) => {
      state.user = null;
      state.status = LoadStatus.IDLE;
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
