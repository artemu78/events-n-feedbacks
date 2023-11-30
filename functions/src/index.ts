/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as logger from 'firebase-functions/logger';
// import { auth, initializeApp } from 'firebase-admin';
import { defineString } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';

import { setAuthorizationCookie, setSimpleCookie } from './auth';
import { COOKIE_NAME, functionParams } from './const';
const fetch = require('node-fetch');

admin.initializeApp();

const token = defineString('NEXT_PUBLIC_OPENAI_API_TOKEN');

export const dallegenerate = onRequest(
  functionParams,
  async (request: functions.https.Request, response: functions.Response) => {
    // get cookie name COOKIE_NAME

    const sessionCookie = request?.cookies?.[COOKIE_NAME] || '';
    logger.info('sessionCookie', { sessionCookie });
    if (!sessionCookie) {
      response.status(401).send('Unauthorized');
      return;
    }

    try {
      const body = JSON.parse(request.body);
      await admin.auth().verifySessionCookie(sessionCookie, true);
      const image = await generate(body.prompt);

      response.json(image);
    } catch (error) {
      logger.error(error);
      response.status(401).send('Unauthorized');
      return;
    }
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
exports.setSimpleCookie = setSimpleCookie;
