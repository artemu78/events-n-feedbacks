import { database } from '@/services/firebaseadmin';

export async function getOrganizationsData() {
  try {
    const something = await database.ref('organizations').get();

    const data = something.val();

    return {
      data,
    };
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
}
