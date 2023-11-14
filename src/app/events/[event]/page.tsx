import {
  Breadcrumbs,
  Grid,
  Link as MUILink,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { database } from '@/services/firebaseadmin';

async function getData(eventid: string) {
  try {
    const something = await database.ref(`events/${eventid}`).get();

    const data = something.val();

    return { ...data };
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
}

const Page = async ({ params }: { params: { event: string } }) => {
  const data = await getData(params.event);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Link href="/events" passHref>
          <MUILink underline="hover" color="inherit">
            Events
          </MUILink>
        </Link>
        <Typography color="text.primary">{data?.title}</Typography>
      </Breadcrumbs>
      <Paper sx={{ p: 2 }}>
        {/* <h1>Event: {params.event}</h1> */}
        <Grid container spacing={2} sx={{ my: 1 }}>
          <Grid item xs={2}>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Date
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{data?.date}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ my: 1 }}>
          <Grid item xs={2}>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Address
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{data?.address}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ my: 1 }}>
          <Grid item xs={2}>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Moderator
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{data?.moderator}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Page;
