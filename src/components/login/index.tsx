'use client';
import {
  Close as CloseIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  registerUserLogin,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter,
} from '@/services/firebaseservice';
import { AppDispatch } from '@/store';
import { clearUser, setUser } from '@/store/userslice';

interface LoginProps {
  title: string;
}

const Login = ({ title }: LoginProps) => {
  const [error, setError] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = searchParams?.get('pathname');

  const handleAuthClick =
    (authFunction: typeof signInWithFacebook) => async () => {
      const { user, error } = await authFunction();
      if (user) {
        registerUserLogin(user);
        const token = await user.getIdToken();

        const coreAuthorizeResult = fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const firebaseAuthorizeResult = fetch(
          'https://us-central1-events-n-feedbacks.cloudfunctions.net/setAuthorizationCookie',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          },
        );

        const disptachResult = dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            organizationsObj: [], // TODO: fill organizationsObj with data from firebase
          }),
        );

        Promise.all([
          coreAuthorizeResult,
          firebaseAuthorizeResult,
          disptachResult,
        ]).then((values) => {
          if (values[0].status === 200 && pathname) {
            router.push(pathname);
          } else {
            router.back();
          }
        });

        // .then((response) => {
        //   if (response.status === 200) {
        //     router.push("/app");
        //   }
        // });
      }
      if (error) {
        setError(error.message);
      }
    };

  return (
    <Dialog
      onClose={() => router.back()}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => router.back()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Stack
          spacing={2}
          sx={{
            mb: 2,
            margin: 'auto',
            alignItems: 'start',
            maxWidth: 'fit-content',
          }}
          direction={'column'}
        >
          <Button
            color="inherit"
            startIcon={<GoogleIcon />}
            sx={{ py: 2 }}
            onClick={handleAuthClick(signInWithGoogle)}
          >
            Google
          </Button>
          {/* <Button
            color="inherit"
            startIcon={<FacebookIcon />}
            sx={{ py: 2 }}
            onClick={handleAuthClick(signInWithFacebook)}
          >
            Facebook
          </Button>
          <Button
            color="inherit"
            startIcon={<TwitterIcon />}
            sx={{ py: 2 }}
            onClick={handleAuthClick(signInWithTwitter)}
          >
            Twitter
          </Button> */}
        </Stack>
      </DialogContent>
      {error && (
        <Alert variant="outlined" severity="error">
          {error}
        </Alert>
      )}
    </Dialog>
  );
};

export default Login;
