import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7vPvrMkXWOwN40FlbFW_aJG3SQiF3aUI",
  authDomain: "mymoney-cc1f9.firebaseapp.com",
  projectId: "mymoney-cc1f9",
  storageBucket: "mymoney-cc1f9.appspot.com",
  messagingSenderId: "952869928223",
  appId: "1:952869928223:web:e21b60c2eff4973270042a",
};

// init our firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// init timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
