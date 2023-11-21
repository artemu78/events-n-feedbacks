'use client';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '@/components/root';
import { AppDispatch, RootState } from '@/store';
import { fetchUser, setUser } from '@/store/userslice';
import { LoadStatus, UserClient, UserState, UserStorage } from '@/types';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const userState = useSelector((state: RootState) => state.user.status);

  const loginUser = useCallback(
    (user: UserClient) => {
      dispatch(
        setUser({
          uid: user.uid,
          displayName: user.name || '',
          email: user.email,
          photoURL: user.picture || '',
          organizationsObj: user.organizationsObj || {},
        }),
      );
    },
    [dispatch],
  );

  const checkUserLogged = useCallback(async () => {
    dispatch(fetchUser());
  }, [loginUser]);

  const [open, setOpen] = useState(matches);
  useEffect(() => {
    if (userState === LoadStatus.IDLE) checkUserLogged();
  }, [checkUserLogged, userState]);

  return (
    <Main open={open} setOpen={setOpen}>
      {children}
    </Main>
  );
}
