// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize
const googleProvider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const firebase_auth = getAuth(app);
const currentUser = firebase_auth.currentUser;
const analytics = getAnalytics(app);
const firebase_db = getFirestore(app);
const firebase_storage = getStorage(
  app,
  "gs://christosangeet-afa3a.appspot.com"
);

export {
  analytics,
  currentUser,
  firebase_auth,
  firebase_db,
  firebase_storage,
  googleProvider,
};
