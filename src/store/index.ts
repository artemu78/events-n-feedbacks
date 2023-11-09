// store/store.ts
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userslice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // other reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
