import { get, ref, set, update } from 'firebase/database';
import { auth } from 'firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { customInitApp, database } from '@/services/firebaseadmin';

export async function GET(request: NextRequest) {
  // TODO: move code duplication to a function, see src\app\api\organization\[organization]\join\route.ts
  const { url } = request;
  const organization = url.split('/')[5];
  const session = cookies().get('session')?.value || '';
  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  await customInitApp();
  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const snapshot = await database.ref(`users/${decodedClaims.uid}`);
  const userSnapshot = await snapshot.get();
  const userFromStorage = userSnapshot.val();

  if (Array.isArray(userFromStorage.organizations)) {
    // find and remove element organization from array userFromStorage.organizations
    const index = userFromStorage.organizations.indexOf(organization);
    if (index > -1) {
      userFromStorage.organizations.splice(index, 1);
    }
  }
  snapshot.set(userFromStorage);

  return NextResponse.json({}, { status: 200 });
}
