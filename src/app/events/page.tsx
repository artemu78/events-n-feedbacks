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

const Page = () => {
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
            height: '100px',
            width: '100px',
            borderColor: 'gray.500',
            p: 1,
          }}
          component="li"
        >
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.address}</p>
          {/* <p>{event.moderator}</p> */}
        </Paper>
      </Link>
    );
  });
};

export default Page;
