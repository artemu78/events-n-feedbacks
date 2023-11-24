import { NextRequest, NextResponse } from 'next/server';

import { authorize, isDecodedClaims } from '@/app/api/authorize';
import { database } from '@/services/firebaseadmin';

export async function GET(request: NextRequest) {
  const decodedClaims = await authorize();
  if (!isDecodedClaims(decodedClaims)) return decodedClaims;

  const { url } = request;
  const organization = url.split('/')[5];
  const snapshot = await database.ref(`users/${decodedClaims.uid}`);
  const userSnapshot = await snapshot.get();
  const userFromStorage = userSnapshot.val();
  if (Array.isArray(userFromStorage.organizations)) {
    userFromStorage.organizations.push(organization);
  } else {
    userFromStorage.organizations = [organization];
  }
  snapshot.set(userFromStorage);

  return NextResponse.json({}, { status: 200 });
}
