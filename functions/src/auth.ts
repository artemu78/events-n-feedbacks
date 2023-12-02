import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';
import { Request, Response } from 'firebase-functions/v1';

import { COOKIE_NAME } from './const';

const functions = require('firebase-functions');
const cors = require('cors');

export const setAuthorizationCookie = functions.https.onRequest(
  async (request: Request, response: Response) => {
    const authorizationHeader = request.headers.authorization;
    const origin = request.headers.origin;
    const method = request.method;

    if (!authorizationHeader && method !== 'OPTIONS') {
      logger.error('authorizationHeader', { description: 'no header', method });
      response
        .status(401)
        .send('Unauthorized. No authorization header present');
      return;
    }

    const token = authorizationHeader?.split(' ')[1];
    if (!token && method !== 'OPTIONS') {
      logger.error('authorizationHeader', {
        description: 'Authorization header present but no token',
        method,
      });
      response
        .status(401)
        .send('Unauthorized. Authorization header present but no token');
      return;
    }

    if (method !== 'OPTIONS') {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await admin
        .auth()
        .createSessionCookie(token || 'notoken', {
          expiresIn,
        });
      response.cookie(COOKIE_NAME, sessionCookie, {
        maxAge: 60 * 60 * 24 * 5 * 1000,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      });
    }

    response.set('Access-Control-Allow-Credentials', 'true');
    response.set('access-control-expose-headers', 'set-cookie');
    cors({ origin })(request, response, () => {
      logger.info('inside cors functions', { origin, method });
      return response.json({ status: 'ok' });
    });
  },
);
