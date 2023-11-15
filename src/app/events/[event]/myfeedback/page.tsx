import { Breadcrumbs, Link as MUILink, Typography } from '@mui/material';
import Link from 'next/link';

import { getEventData } from '@/app/events/[event]/formaction';
import SingleFeedback from '@/components/feedback';
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
      {feedbacksArray.map((feedback) => (
        <SingleFeedback key={feedback.id} feedback={feedback} />
      ))}
    </>
  );
};

export default Page;
