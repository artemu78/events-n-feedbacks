import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from 'firebase/database';

import { db } from '@/services/firebaseconfig';

export async function getFeedbacks(eventid: string) {
  try {
    const feedbacksRef = ref(db, `/feedbacks`);
    const feedbacksForEventQuery = query(
      feedbacksRef,
      orderByChild('eventId'),
      equalTo(eventid),
    );

    const snapshot = await get(feedbacksForEventQuery);

    if (snapshot.exists()) {
      const feedbacks = snapshot.val();
      return feedbacks;
    } else {
      console.log(`No feedbacks found for this event '${eventid}'`);
      return {};
    }
  } catch (error) {
    console.error('Error fetching feedbacks: ', error);
    return {};
  }
}
