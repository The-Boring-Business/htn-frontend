import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ5-bEkLl8emUBATkuktP-6FvgEcZMaRQ",
  authDomain: "next-js-voting-app.firebaseapp.com",
  projectId: "next-js-voting-app",
  storageBucket: "next-js-voting-app.appspot.com",
  messagingSenderId: "834204346608",
  appId: "1:834204346608:web:90af11d2aff4e672d83a35",
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;