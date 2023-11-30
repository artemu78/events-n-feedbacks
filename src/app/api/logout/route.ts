import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  // remove "session" cookie
  cookies().set('session', '', { maxAge: 0 });
  return NextResponse.json({}, { status: 200 });
}
