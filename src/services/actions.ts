import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from 'firebase/database';

import { database } from '@/services/firebaseadmin';

export async function getCollectionData(collection: string) {
  try {
    const something = await database.ref(collection).get();
    const data = something.val();
    return { ...data };
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
}
