import {
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

import { Organizations } from '@/app/admin/organizations/page';
import HiddenUserIdField from '@/components/userfield';
import { RootState } from '@/store';

const JoinPage = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Profile
          </MUILink>
        </Link>
      </Breadcrumbs>
      <Typography sx={{ mb: 2 }} variant="h4">
        Choose organization to join
      </Typography>
      <Stack
        component="ul"
        sx={{
          listStyleType: 'none',
        }}
        useFlexGap
        flexWrap="wrap"
        direction="row"
        spacing={{ xs: 1, sm: 2 }}
      >
        <Organizations />
      </Stack>
    </>
  );
};

export default JoinPage;
