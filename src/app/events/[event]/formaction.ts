import { database } from '@/services/firebaseadmin';
import { Event } from '@/types';

export async function getEventData(eventid: string): Promise<Event | null> {
  try {
    const something = await database.ref(`events/${eventid}`).get();

    const data = something.val();

    return { ...data };
  } catch (error) {
    console.error(`Error fetching event '${eventid}': `, error);
    return null;
  }
}
