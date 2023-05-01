npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP7LIwhCMwO3mQsgVKGplhX_7etZzjgiw",
  authDomain: "bookmyticket-c9405.firebaseapp.com",
  projectId: "bookmyticket-c9405",
  storageBucket: "bookmyticket-c9405.appspot.com",
  messagingSenderId: "555679436964",
  appId: "1:555679436964:web:f6084251eba7783737d631",
  measurementId: "G-RFQM4SHT0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);