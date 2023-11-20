'use client';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '@/components/root';
import { AppDispatch, RootState } from '@/store';
import { setUser } from '@/store/userslice';
import { User, UserState, UserStatus } from '@/types';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const userState = useSelector((state: RootState) => state.user.status);

  const loginUser = (user: User) => {
    dispatch(
      setUser({
        uid: user.uid,
        displayName: user.name || '',
        email: user.email,
        photoURL: user.picture || '',
        organizations: [],
      }),
    );
  };

  const checkUserLogged = async () => {
    const response = await fetch('/api/auth');
    if (response.status === 200) {
      const user: UserState = await response.json();
      user.user && loginUser(user?.user);
    }
  };

  const [open, setOpen] = useState(matches);
  useEffect(() => {
    if (userState === UserStatus.IDLE) checkUserLogged();
  }, [checkUserLogged, userState]);

  return (
    <Main open={open} setOpen={setOpen}>
      {children}
    </Main>
  );
}
