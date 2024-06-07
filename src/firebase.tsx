// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASu9PvMcAc0refWhraPwQc5K8hH4Qgpc4",
  authDomain: "amg-pwa-notification.firebaseapp.com",
  projectId: "amg-pwa-notification",
  storageBucket: "amg-pwa-notification.appspot.com",
  messagingSenderId: "995495715568",
  appId: "1:995495715568:web:217cd8f076cd70883a9835",
  measurementId: "G-X4PDFZ90TP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)
