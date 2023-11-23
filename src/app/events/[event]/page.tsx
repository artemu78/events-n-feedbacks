import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link as MUILink,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { getEventData } from './formaction';

const EventPage = async ({ params }: { params: { event: string } }) => {
  const eventId = params.event;
  const eventData = await getEventData(eventId);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Link href="/events" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Events
          </MUILink>
        </Link>
        <Typography color="text.primary">{eventData?.date}</Typography>
      </Breadcrumbs>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper sx={{ p: 2, flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Date
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
              <Typography variant="body1">{eventData?.date}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
              <Typography variant="body1">{eventData?.address}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Moderator
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
              <Typography variant="body1">{eventData?.moderator}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={{ xs: 0, sm: 2 }} sx={{ my: 1 }}>
            <Grid item xs={12} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Topic
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="body1">{eventData?.topic}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Box sx={{ flexShrink: 0 }} maxWidth={{ xs: '100%', md: '50%' }}>
          <img
            src={eventData?.logoUrl}
            style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
          />
        </Box>
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'initial'}
        sx={{ my: 2 }}
        spacing={1}
      >
        <Link href={`/events/${eventId}/addfeedback`} passHref>
          <Button variant="contained" color="primary">
            Add feedback
          </Button>
        </Link>
        <Link href={`/events/${eventId}/myfeedback`} passHref>
          <Button variant="contained" color="primary">
            My feedbacks
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default EventPage;
