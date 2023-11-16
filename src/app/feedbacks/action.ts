import { get, orderByChild, query, ref } from 'firebase/database';

import { getCollectionData } from '@/services/actions';
import { db } from '@/services/firebaseconfig';
import { EnrichCollection } from '@/services/utils';
import { Feedback, User } from '@/types';

export async function getFeedbacks() {
  try {
    const feedbacksRef = ref(db, `/feedbacks`);
    const feedbacksForEventQuery = query(feedbacksRef, orderByChild('eventId'));

    const snapshot = await get(feedbacksForEventQuery);

    if (snapshot.exists()) {
      const feedbacks = snapshot.val();
      const users = await getCollectionData<User>('users');

      const feedbacksEnriched = EnrichCollection<Feedback, User>(
        feedbacks,
        users,
        'createUserId',
        'user',
      );

      return feedbacksEnriched;
    } else {
      console.log(`No feedbacks found for this user `);
      return {};
    }
  } catch (error) {
    console.error('Error fetching feedbacks: ', error);
    return {};
  }
}
