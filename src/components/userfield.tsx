'use client';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

const HiddenUserIdField = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <TextField
      name="userId"
      type="hidden"
      value={user?.uid}
      sx={{ display: 'none' }}
    />
  );
};

export default HiddenUserIdField;
