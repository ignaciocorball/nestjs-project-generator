// src/firebase/firebase.config.ts

import * as path from 'path';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-default-rtdb.firebaseio.com',
  // Otras configuraciones de Firebase, si las tienes
});

export default admin;
