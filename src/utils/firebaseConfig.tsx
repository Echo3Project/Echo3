import { getAnalytics } from '@firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';

// import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
    // Web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp);
const firebaseAnalytics = getAnalytics(firebaseApp);

// reportWebVitals();

export { firebaseApp, firebaseDb, firebaseAnalytics };