'use server';
import { push, ref } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/services/firebaseconfig';

export async function formSubmitAction(formData: FormData) {
  'use server';
  const eventId = formData.get('eventId');
  const eventReference = ref(db, `feedbacks`);

  const result = await push(eventReference, {
    eventId,
    addressee: formData.get('addressee'),
    sender: formData.get('userId'),
    good: formData.get('good'),
    improve: formData.get('improve'),
    suggestion: formData.get('suggestion'),
    anonymous: formData.get('anonymous'),
    createDateTime: new Date().toISOString(),
    createUserId: formData.get('userId'),
  });

  revalidatePath(`/events/${eventId}/myfeedback`);
  redirect(`/events/${eventId}`);
}
