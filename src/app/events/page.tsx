import { Paper, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import { database } from '@/services/firebaseadmin';
import { Event } from '@/types';
type EventRecord = Record<string, Event>;
interface EventRecordWithId extends Event {
  id: string;
}

function flattenJson(jsonObject: EventRecord): Array<EventRecordWithId> {
  const flattenedArray: Array<EventRecordWithId> = [];

  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      const flattenedObject = { id: key, ...jsonObject[key] };
      flattenedArray.push(flattenedObject);
    }
  }

  return flattenedArray;
}

async function getData() {
  try {
    const something = await database.ref('events').get();

    const data = something.val();

    return {
      data,
    };
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
}

export const metadata: Metadata = {
  title: "Events'n'Feedback / events",
  description: 'Event, speakers and their feedback',
};

const Page = () => {
  return (
    <div>
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
    </div>
  );
};

const Events = async () => {
  const events = await getData();
  const eventsArray = flattenJson(events.data);

  return eventsArray.map((event: EventRecordWithId) => {
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
