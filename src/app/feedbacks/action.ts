import { get, orderByChild, query, ref } from 'firebase/database';

import { db } from '@/services/firebaseconfig';

export async function getFeedbacks() {
  try {
    const feedbacksRef = ref(db, `/feedbacks`);
    const feedbacksForEventQuery = query(feedbacksRef, orderByChild('eventId'));

    const snapshot = await get(feedbacksForEventQuery);

    if (snapshot.exists()) {
      const feedbacks = snapshot.val();
      return feedbacks;
    } else {
      console.log(`No feedbacks found for this user `);
      return {};
    }
  } catch (error) {
    console.error('Error fetching feedbacks: ', error);
    return {};
  }
}
