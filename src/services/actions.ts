'use server';

import { database } from '@/services/firebaseadmin';

export async function getCollectionData<Entity>(
  collection: string,
): Promise<Record<string, Entity>> {
  try {
    const something = await database.ref(collection).get();
    const data = something.val() as Record<string, Entity>;
    return { ...data };
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
}
