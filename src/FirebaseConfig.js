import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Config data
const firebaseConfig = {
  apiKey: "AIzaSyBivyl9R-vMi6HvYj3IcGEI09opClFSl4c",
  authDomain: "typing-speed-test-792b2.firebaseapp.com",
  projectId: "typing-speed-test-792b2",
  storageBucket: "typing-speed-test-792b2.appspot.com",
  messagingSenderId: "727228699735",
  appId: "1:727228699735:web:b29235ec5523b6ca8bff12",
  measurementId: "G-R5MKEGG6KD",
};

//   Initialize the firebase application
//Connected the react app to firestore
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };
