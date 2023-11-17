'use server';
import { push, ref } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { bucket } from '@/services/firebaseadmin';
import { db } from '@/services/firebaseconfig';

export async function formSubmitAction(formData: FormData) {
  let logoUrl = '';

  const fileField = formData.get('logo');

  if (fileField && fileField instanceof File) {
    let stream: NodeJS.WritableStream, bob: Buffer;

    const fileRef = bucket.file(`uploads/${fileField.name}`);
    // const blob = await fileField.stream();
    const blob = await fileField.arrayBuffer();
    bob = Buffer.from(blob);

    // Create a write stream and upload the buffer
    stream = fileRef.createWriteStream({
      metadata: {
        contentType: 'auto', // or the specific mime type of your file
      },
    });

    stream?.on('error', (error: any) => {
      throw new Error('Error uploading file: ' + error.message);
    });

    stream?.on('finish', async () => {
      await fileRef.makePublic();
      logoUrl = fileRef.publicUrl();
      await addEvent(formData, logoUrl);
    });

    stream?.end(bob);
  }
  return true;
}

async function addEvent(formData: FormData, logoUrl: string) {
  let newEventKey;

  // try {
  const eventReference = ref(db, `events`);
  const result = await push(eventReference, {
    moderator: formData.get('moderatorName'),
    date: formData.get('eventDate'),
    address: formData.get('address'),
    topic: formData.get('topic'),
    createDateTime: new Date().toISOString(),
    createUserId: formData.get('userId'),
    logoUrl,
  });
  // get the key of the new event
  newEventKey = result.key;
  // } catch (error) {
  //   console.error('Error saving event: ', error);
  // }
  // await revalidatePath('/events');
  // redirect(`/events/${newEventKey}?success`);
}
