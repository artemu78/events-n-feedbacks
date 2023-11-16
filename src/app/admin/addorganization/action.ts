'use server';
import { push, ref } from 'firebase/database';
import { revalidatePath } from 'next/cache';

import { db } from '@/services/firebaseconfig';

export async function formSubmitAction(formData: FormData) {
  try {
    const eventReference = ref(db, `organizations`);

    const result = await push(eventReference, {
      title: formData.get('title'),
      description: formData.get('description'),
      site: formData.get('site'),
      instagram: formData.get('instagram'),
      facebook: formData.get('facebook'),
      createDateTime: new Date().toISOString(),
      createUserId: formData.get('userId'),
    });

    await revalidatePath('/events');
    // redirect('/events', RedirectType.push);
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
}
