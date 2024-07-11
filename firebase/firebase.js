
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB128YVhUGNjRDwsjlJh9UB9ia4crGTXAk",
    authDomain: "devsindia-192f5.firebaseapp.com",
    projectId: "devsindia-192f5",
    storageBucket: "devsindia-192f5.appspot.com",
    messagingSenderId: "697207219200",
    appId: "1:697207219200:web:b659aae0a69860b62a64e5",
    measurementId: "G-LH02GMB35K"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };