import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';

import { COOKIE_NAME, functionParams } from './const';

export const setAuthorizationCookie = onRequest(
  functionParams,
  async (request: functions.https.Request, response: functions.Response) => {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      response.status(401).send('Unauthorized');
      return;
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      response.status(401).send('Unauthorized');
      return;
    }
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(token, {
      expiresIn,
    });

    response.cookie(COOKIE_NAME, sessionCookie, {
      maxAge: expiresIn,
      sameSite: 'none',
      httpOnly: false,
      secure: false,
    });
    response.set('access-control-expose-headers', 'set-cookie');
    response.set('access-control-allow-origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true');

    response.status(200).send('Authorization cookie set');
  },
);

export const setSimpleCookie = onRequest(
  functionParams,
  async (request: functions.https.Request, response: functions.Response) => {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    //get header Origin from request
    const origin = request.headers.origin;

    response.cookie(COOKIE_NAME, 'fakevalue', {
      maxAge: expiresIn,
      sameSite: 'none',
      httpOnly: false,
      secure: true,
    });
    response.set('access-control-expose-headers', 'set-cookie');
    response.set('access-control-allow-origin', origin);
    response.set('Access-Control-Allow-Credentials', 'true');

    response.status(200).send('cookie set');
  },
);
