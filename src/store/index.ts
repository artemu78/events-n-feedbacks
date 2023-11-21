// store/store.ts
import { configureStore } from '@reduxjs/toolkit';

import organizationsReducer from './organizations';
import userReducer from './userslice';

const store = configureStore({
  reducer: {
    user: userReducer,
    organizations: organizationsReducer,
    // other reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
