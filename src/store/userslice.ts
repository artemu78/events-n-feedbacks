import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { LoadStatus, UserClient, UserState } from '@/types';
import { Organization } from '@/types/index';

import { setOrganizations } from './organizations';

const initialState: UserState = {
  user: null,
  status: LoadStatus.IDLE,
  joinstatus: LoadStatus.IDLE,
  joiningorganization: '',
  error: null,
  organization: null,
};

// First, create the thunk
export const joinOrganization = createAsyncThunk<
  {},
  string,
  { rejectValue: string }
>('users/joinOrganization', async (organizationId: string, thunkAPI) => {
  const organization = (
    thunkAPI.getState() as RootState
  ).organizations.data.find((org) => org.id === organizationId);
  const response = await fetch(`/api/organization/${organizationId}/join`, {
    credentials: 'include',
  });
  if (!response.ok) {
    // Return the error message thunkAPI.rejectWithValue
    return thunkAPI.rejectWithValue('Failed to join organization');
  }
  // send organization to reducer
  organization && thunkAPI.dispatch(addOrganization(organization));
  return {};
});

export const leaveOrganization = createAsyncThunk<
  {},
  string,
  { rejectValue: string }
>('users/leaveOrganization', async (organizationId: string, thunkAPI) => {
  const response = await fetch(`/api/organization/${organizationId}/leave`, {
    credentials: 'include',
  });
  if (!response.ok) {
    // Return the error message thunkAPI.rejectWithValue
    return thunkAPI.rejectWithValue('Failed to join organization');
  }
  // send organization to reducer
  thunkAPI.dispatch(removeOrganization(organizationId));
  return {};
});

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
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.user?.organizationsObj.push(action.payload);
    },
    removeOrganization: (state, action: PayloadAction<string>) => {
      const index = state.user?.organizationsObj.findIndex(
        (org) => org.id === action.payload,
      );
      if (index !== undefined && index !== -1) {
        state.user?.organizationsObj.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(joinOrganization.pending, (state, action) => {
      state.joiningorganization = action.meta.arg;
      state.joinstatus = LoadStatus.LOADING;
    });
    builder.addCase(joinOrganization.fulfilled, (state) => {
      state.joiningorganization = '';
      state.joinstatus = LoadStatus.SUCCEEDED;
      // state.user?.organizationsObj.push
    });
    builder.addCase(joinOrganization.rejected, (state, action) => {
      state.joiningorganization = '';
      state.joinstatus = LoadStatus.FAILED;
      state.error = action.payload || 'Failed to join organization';
    });
    builder.addCase(leaveOrganization.pending, (state, action) => {
      state.joiningorganization = action.meta.arg;
      state.joinstatus = LoadStatus.LOADING;
    });
    builder.addCase(leaveOrganization.fulfilled, (state) => {
      state.joiningorganization = '';
      state.joinstatus = LoadStatus.SUCCEEDED;
    });
    builder.addCase(leaveOrganization.rejected, (state, action) => {
      state.joiningorganization = '';
      state.joinstatus = LoadStatus.FAILED;
      state.error = action.payload || 'Failed to leave organization';
    });
  },
});

export const {
  setUser,
  clearUser,
  setStatus,
  setError,
  addOrganization,
  removeOrganization,
} = userSlice.actions;
export default userSlice.reducer;
