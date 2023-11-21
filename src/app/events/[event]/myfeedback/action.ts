import { equalTo, get, orderByChild, query, ref } from 'firebase/database';

import { getCollectionData } from '@/services/actions';
import { db } from '@/services/firebaseconfig';
import { EnrichCollection } from '@/services/utils';
import { Feedback, UserStorage } from '@/types';

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
      const feedbacks = snapshot.val() as Record<string, Feedback>;
      const users = await getCollectionData<UserStorage>('users');

      const feedbacksEnriched = EnrichCollection<Feedback, UserStorage>(
        feedbacks,
        users,
        'createUserId',
        'user',
      );
      return feedbacksEnriched;
    } else {
      console.log(`No feedbacks found for this event '${eventid}'`);
      return {};
    }
  } catch (error) {
    console.error('Error fetching feedbacks: ', error);
    return {};
  }
}
