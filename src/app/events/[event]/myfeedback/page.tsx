import {
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link as MUILink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { getEventData } from '@/app/events/[event]/formaction';
import { flattenJson } from '@/services/utils';
import { Feedback } from '@/types';

import { getFeedbacks } from './action';

const Page = async ({ params }: { params: { event: string } }) => {
  const eventId = params.event;
  const eventData = await getEventData(eventId);
  const feedbacks = (await getFeedbacks(eventId)) as Record<string, Feedback>;
  const feedbacksArray = flattenJson<Feedback>(feedbacks);

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
        <Link href={`/events/${eventId}`} passHref>
          <MUILink component="span" underline="hover" color="inherit">
            {eventData?.date}
          </MUILink>
        </Link>
        <Typography color="text.primary">My feedbacks</Typography>
      </Breadcrumbs>
      <Typography component="h1" variant="h5">
        My feedbacks
      </Typography>
      {feedbacksArray.map((feedback) => (
        <Feedback key={feedback.id} feedback={feedback} />
      ))}
    </>
  );
};

const Feedback = ({ feedback }: { feedback: Feedback }) => {
  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={6} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            From
          </Typography>
        </Grid>
        <Grid item xs={6} sm={10}>
          <Typography variant="body1">
            {feedback.anonymous === 'true' ? 'Anonimous' : feedback.sender}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            What was good
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="body1">{feedback.good}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            What could be improved
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="body1">{feedback.improve}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            Suggestion
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="body1">{feedback.suggestion}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Page;
