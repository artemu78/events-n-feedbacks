import { auth } from 'firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getCollectionData, getSingleEntry } from '@/services/actions';
import { customInitApp } from '@/services/firebaseadmin';
import { flattenJson } from '@/services/utils';
import type { Organization, UserClient, UserStorage } from '@/types/index';

export async function GET(request: NextRequest) {
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

  const userFromStoragePromise = getSingleEntry<UserStorage>(
    'users',
    decodedClaims.uid,
  );
  const organizationsPromise = getCollectionData<Organization>('organizations');

  const [userFromStorage, organizationsStorage] = await Promise.all([
    userFromStoragePromise,
    organizationsPromise,
  ]);
  const organizations = flattenJson<Organization>(organizationsStorage);
  if (userFromStorage) userFromStorage.organizationsObj = [];
  Array.isArray(userFromStorage?.organizations) &&
    userFromStorage?.organizations.forEach((organizationId) => {
      const organizationFromStorage = organizationsStorage[organizationId];
      if (organizationFromStorage) {
        organizationFromStorage.id = organizationId;
        userFromStorage.organizationsObj.push(organizationFromStorage);
      }
    });

  const {
    iss,
    aud,
    auth_time,
    sub,
    iat,
    exp,
    firebase,
    email_verified,
    ...user
  } = decodedClaims;
  user.organizations = userFromStorage?.organizations || [];
  user.organizationsObj = userFromStorage?.organizationsObj || [];
  return NextResponse.json(
    { isLogged: true, user, organizations },
    { status: 200 },
  );
}

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get('Authorization');

  if (authorization?.startsWith('Bearer ')) {
    await customInitApp();
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      //Generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const sessionOptions = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: false,
      };

      //Add the cookie to the browser
      cookies().set(sessionOptions);
    }
  }

  return NextResponse.json({}, { status: 200 });
}
