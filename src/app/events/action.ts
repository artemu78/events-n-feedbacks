import { database } from '@/services/firebaseadmin';

export async function getEventsData() {
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
