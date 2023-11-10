// pages/api/add-event.js
import { NextApiRequest, NextApiResponse } from 'next';

import admin from '@/services/firebaseadmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req?.headers?.authorization?.split('Bearer ')[1] || '';
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Optionally, check additional attributes in the Realtime Database
    const userId = decodedToken.uid;
    const userRef = admin.database().ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');
    const user = userSnapshot.val();

    // Perform your logic here...

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
