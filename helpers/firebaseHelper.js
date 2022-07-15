import firebase from 'firebase/compat/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const firebaseCloudMessaging = {
  getFCMToken: async () => {
    const messaging = getMessaging(firebaseApp);
    const fcmToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY });
    return fcmToken;
  },
};

const auth = getAuth(firebaseApp);

export { firebaseCloudMessaging, auth };
