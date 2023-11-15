'use server';
import { getAuth } from 'firebase/auth';
import { get, push, ref, set, update } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/services/firebaseconfig';

export async function formSubmitAction(formData: FormData) {
  'use server';
  const eventId = formData.get('eventId');
  const eventReference = ref(db, `feedbacks`);
  // const auth = getAuth();
  // const user = auth.currentUser;

  const result = await push(eventReference, {
    // userId: user?.uid,
    eventId,
    addressee: formData.get('addressee'),
    sender: 'fake sender',
    good: formData.get('good'),
    improve: formData.get('improve'),
    suggestion: formData.get('suggestion'),
    anonymous: formData.get('anonymous'),
    createDateTime: new Date().toISOString(),
  });

  revalidatePath(`/events/${eventId}/myfeedback`);
  redirect(`/events/${eventId}`);
  // try {

  //   const response = await fetch("/api/addevent", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     body: formData,
  //   });
  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status}`);
  //   }

  //   // Clear the form or give any success message
  //   alert("Event added successfully!");
  // } catch (error) {
  //   console.error("Failed to add event", error);
  // }
  // ...
}
