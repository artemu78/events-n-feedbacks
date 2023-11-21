import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoadStatus, Organization } from '@/types';

interface OrganizationsStore {
  data: Organization[];
  status: LoadStatus;
  error: string | null;
}

const initialState: OrganizationsStore = {
  status: LoadStatus.IDLE,
  error: null,
  data: [],
};

const userSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.data = action.payload;
      state.status = LoadStatus.SUCCEEDED;
    },
    clearOrganizations: (state) => {
      state.data = [];
      state.status = LoadStatus.IDLE;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setOrganizations, clearOrganizations, setError } =
  userSlice.actions;
export default userSlice.reducer;
