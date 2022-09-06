// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkroUEQQmZaD3NhAF_Y8CUjXcXholZupQ",
  authDomain: "nightcrawler-f7af2.firebaseapp.com",
  projectId: "nightcrawler-f7af2",
  storageBucket: "nightcrawler-f7af2.appspot.com",
  messagingSenderId: "1043258161294",
  appId: "1:1043258161294:web:891b639a484a03656df1df",
  measurementId: "G-CE123B8VF8"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
