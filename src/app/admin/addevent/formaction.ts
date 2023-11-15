'use server';
import { push, ref } from 'firebase/database';
import { revalidatePath } from 'next/cache';

import { db } from '@/services/firebaseconfig';

export async function formSubmitAction(formData: FormData) {
  'use server';

  try {
    const eventReference = ref(db, `events`);

    const result = await push(eventReference, {
      moderator: formData.get('moderatorName'),
      date: formData.get('eventDate'),
      address: formData.get('address'),
      topic: formData.get('topic'),
      createDateTime: new Date().toISOString(),
    });

    await revalidatePath('/events');
    // redirect('/events', RedirectType.push);
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
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
