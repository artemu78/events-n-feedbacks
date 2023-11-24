import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { customInitApp } from '@/services/firebaseadmin';

export async function authorize() {
  const session = cookies().get('session')?.value || '';
  //Validate if the cookie exist in the request
  if (!session) {
    const resp = NextResponse.json({ isLogged: false }, { status: 401 });
    return resp;
  }
  await customInitApp();
  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return decodedClaims;
}

export const isDecodedClaims = (
  param: DecodedIdToken | any,
): param is DecodedIdToken => {
  return param.hasOwnProperty('uid');
};
