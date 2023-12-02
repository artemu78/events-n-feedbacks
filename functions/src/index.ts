import admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';
import { defineString } from 'firebase-functions/params';
import { Request, Response } from 'firebase-functions/v1';

import { setAuthorizationCookie } from './auth';
import { COOKIE_NAME } from './const';

const fetch = require('node-fetch');
const functions = require('firebase-functions');
const cors = require('cors');

admin.initializeApp();

const token = defineString('NEXT_PUBLIC_OPENAI_API_TOKEN');

export const dallegenerate = functions.https.onRequest(
  async (request: Request, response: Response) => {
    const origin = request.headers.origin;
    const cookie = request.headers.cookie;
    const method = request.method;

    // parse cookies
    const cookiesList: Record<string, string> = {};
    const rc = cookie;
    rc?.split(';')?.forEach((cookie) => {
      const parts = cookie?.split('=');
      cookiesList[parts?.shift()?.trim() || ''] = decodeURI(parts.join('='));
    });

    response.set('Access-Control-Allow-Credentials', 'true');
    response.set('access-control-expose-headers', 'set-cookie');
    response.set('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {
      cors({ origin })(request, response, () => {
        return response.json({ status: 'ok' });
      });
      return;
    }

    const sessionCookie = cookiesList[COOKIE_NAME] || '';
    if (!sessionCookie) {
      logger.error('cookie_logs', {
        description: 'No session cookie present',
        method,
      });
      response.status(401).send('Unauthorized');
      return;
    }

    try {
      await admin.auth().verifySessionCookie(sessionCookie, true);
    } catch (error) {
      logger.error(error);
      response.status(401).send('Unauthorized. Invalid session cookie');
      return;
    }

    let image = {};
    try {
      const body = JSON.parse(request.body);
      image = await generate(body.prompt);
    } catch (error) {
      logger.error(error);
      response.status(500).send('Image generation failed');
      return;
    }
    response.status(200).send(image);
  },
);

const generate = async (prompt: string) => {
  const url = 'https://api.openai.com/v1/images/generations';
  const body = {
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value()}`,
    },
    body: JSON.stringify(body),
  };
  logger.info(url, options);
  const response = await fetch(url, options);
  const imageData = await response.json();
  return imageData?.data?.[0];
};

exports.setAuthorizationCookie = setAuthorizationCookie;
