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

    const fileRef = bucket.file(`organizations/${fileField.name}`);
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
      await addOrganization(formData, logoUrl);
    });

    stream?.end(bob);
  }
  return true;
}

export async function addOrganization(formData: FormData, logoUrl: string) {
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
      logoUrl,
    });

    await revalidatePath('/organizations');
    redirect('/organizations', RedirectType.push);
  } catch (error) {
    console.error('Error fetching events: ', error);
    return {};
  }
}
