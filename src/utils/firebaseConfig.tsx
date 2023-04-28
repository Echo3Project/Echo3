import { getAnalytics } from '@firebase/analytics';
import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

// import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
    // Web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp);
const firebaseAnalytics =
    firebaseApp.name && typeof window !== 'undefined'
        ? getAnalytics(firebaseApp)
        : null;

// reportWebVitals();

export { firebaseApp, firebaseDb, firebaseAnalytics };
