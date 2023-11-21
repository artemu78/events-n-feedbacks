'use client';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link as MUILink,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import HiddenUserIdField from '@/components/userfield';
import { RootState } from '@/store';
import { Organization } from '@/types';

const ProfilePage = () => {
  const path = usePathname();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Typography color="text.primary">{user?.name}</Typography>
      </Breadcrumbs>
      <Typography sx={{ mb: 2 }} variant="h4">
        Profile
      </Typography>

      <Grid spacing={2} container>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, flexGrow: 1 }}>
            <HiddenUserIdField />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              type="text"
              label="This name will be  the website 1"
              value={user?.name || ''}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={user?.email || ''}
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="eventDate">Profile picture</InputLabel>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="picture"
                type="file"
                value={''}
              />
            </FormControl>
            <fieldset style={{ padding: '8px' }}>
              <legend>My organizaions</legend>
              <Stack direction="column" spacing={2}>
                {user?.organizationsObj?.map((organization: Organization) => (
                  <Link
                    key={organization.id}
                    href={`/organizations/${organization.id}`}
                  >
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                      <Avatar
                        alt={organization.title}
                        src={organization.logoUrl}
                      />
                      <Typography>{organization.title}</Typography>
                    </Stack>
                  </Link>
                ))}
              </Stack>
            </fieldset>
          </Paper>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button type="submit" variant="contained">
              save
            </Button>

            <Link href={`${path}/joinorganization`} passHref>
              <Button variant="contained" color="primary" fullWidth>
                join organization
              </Button>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ flexShrink: 0 }} maxWidth={{ xs: '100%', md: '50%' }}>
            <img
              src={user?.photoURL || ''}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
