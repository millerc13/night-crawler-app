// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD-8O8ys8bwF4N4-bGavw5KwziaHwELVNU",
  authDomain: "group13-night-crawler.firebaseapp.com",
  projectId: "group13-night-crawler",
  storageBucket: "group13-night-crawler.appspot.com",
  messagingSenderId: "52466109472",
  appId: "1:52466109472:web:3f22774086f5053cd74045",
  measurementId: "G-QN54Z2X23D"
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
