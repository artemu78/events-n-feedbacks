import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserState, UserStatus } from '@/types';

const initialState: UserState = {
  user: null,
  status: UserStatus.IDLE,
  error: null,
  organization: null,
};

// add redux thunk to handle async actions
// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#async-logic-and-data-fetching
// export const fetchUser = () => async (dispatch: any) => {
//   try {
//     const res = await fetch('/api/user');
//     const data = await res.json();
//     dispatch(setUser(data));
//   } catch (err) {
//     dispatch(setError(err.toString()));
//   }
// };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = UserStatus.SUCCEEDED;
    },
    clearUser: (state) => {
      state.user = null;
      state.status = UserStatus.IDLE;
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
