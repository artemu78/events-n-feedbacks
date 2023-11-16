import { database } from '@/services/firebaseadmin';

export async function getOrganizationData(organizationid: string) {
  try {
    const something = await database
      .ref(`organizations/${organizationid}`)
      .get();

    const data = something.val();

    return { ...data };
  } catch (error) {
    console.error(`Error fetching organization '${organizationid}': `, error);
    return {};
  }
}
