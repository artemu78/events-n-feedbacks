import { database } from '@/services/firebaseadmin';

export async function getEventData(eventid: string) {
  try {
    const something = await database.ref(`events/${eventid}`).get();

    const data = something.val();

    return { ...data };
  } catch (error) {
    console.error(`Error fetching event '${eventid}': `, error);
    return {};
  }
}
