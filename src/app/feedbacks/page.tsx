import { Box, Breadcrumbs, Link as MUILink, Typography } from '@mui/material';
import Link from 'next/link';

import SingleFeedback from '@/components/feedback';
import { getCollectionData } from '@/services/actions';
import { flattenJson } from '@/services/utils';
import { Event, Feedback } from '@/types';

import { getFeedbacks } from './action';

const Page = async () => {
  const events = await getCollectionData<Event>('events');
  const feedbacks = (await getFeedbacks()) as Record<string, Feedback>;
  const feedbacksArray = flattenJson<Feedback>(feedbacks);
  let eventId: string | null = null;
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Typography color="text.primary">My feedbacks</Typography>
      </Breadcrumbs>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        My feedbacks
      </Typography>
      <Typography component="div" variant="body1" sx={{ color: '#757575' }}>
        Feedback summary:
      </Typography>
      <Typography component="span" variant="body1">
        According to the feedbacks you have received, you are a great
        storyteller. Next time would be nice to focus on eye contact and stage
        usage purpously.
      </Typography>
      {feedbacksArray.map((feedback) => {
        let eventComponent = null;
        if (feedback.eventId !== eventId) {
          const eventObject = events?.[feedback.eventId] || {};
          eventComponent = (
            <Link href={`/events/${feedback.eventId}`}>
              <Typography component="h2" variant="h5" sx={{ mt: 2 }}>
                {eventObject?.date}
              </Typography>
            </Link>
          );
          eventId = feedback.eventId;
        }
        return (
          <Box key={feedback.eventId}>
            {eventComponent}
            <SingleFeedback key={feedback.id} feedback={feedback} />
          </Box>
        );
      })}
    </>
  );
};

export default Page;
