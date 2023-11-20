import {
  Breadcrumbs,
  Link as MUILink,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import { getCollectionData } from '@/services/actions';
import { flattenJson } from '@/services/utils';
import { Event } from '@/types';

export const metadata: Metadata = {
  title: "Events'n'Feedback / events",
  description: 'Event, speakers and their feedback',
};

const EventsPage = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Typography color="text.primary">Events</Typography>
      </Breadcrumbs>
      <Typography sx={{ mb: 2 }} variant="h4">
        Events
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
        <Events />
      </Stack>
    </>
  );
};

const Events = async () => {
  const events = await getCollectionData<Event>('events');
  const eventsArray = flattenJson<Event>(events);

  return eventsArray.map((event) => {
    return (
      <Link key={event.id} passHref href={`/events/${event.id}`}>
        <Paper
          sx={{
            width: '300px',
            height: '300px',
            p: 1,
            overflow: 'hidden',
          }}
          component="li"
        >
          <Typography variant="h5">{event.title}</Typography>

          <Stack spacing={1} direction={{ xs: 'column', md: 'row' }}>
            <Typography>{event.date}</Typography>
            <Typography variant="body2">{event.address}</Typography>
          </Stack>
          <Typography noWrap>{event.topic}</Typography>
          <img
            src={event.logoUrl}
            alt={event.title}
            style={{ width: '100%' }}
          />
          {/* <p>{event.moderator}</p> */}
        </Paper>
      </Link>
    );
  });
};

export default EventsPage;
