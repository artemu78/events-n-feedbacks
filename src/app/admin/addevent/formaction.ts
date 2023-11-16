'use server';
import { push, ref } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/services/firebaseconfig';

export async function formSubmitAction(formData: FormData) {
  try {
    const eventReference = ref(db, `events`);

    const result = await push(eventReference, {
      moderator: formData.get('moderatorName'),
      date: formData.get('eventDate'),
      address: formData.get('address'),
      topic: formData.get('topic'),
      createDateTime: new Date().toISOString(),
      createUserId: formData.get('userId'),
    });

    await revalidatePath('/events');
    redirect('/events');
  } catch (error) {
    console.error('Error saving event: ', error);
  }
}
