import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDPnlKut0xCV-m13VewfO0X40sZfc9uIgg",
    authDomain: "idea-tracker-b7c85.firebaseapp.com",
    projectId: "idea-tracker-b7c85",
    storageBucket: "idea-tracker-b7c85.appspot.com",
    messagingSenderId: "6406521333",
    appId: "1:6406521333:web:6380adee19a245ede3a0bc",
    measurementId: "G-HDSQ9L3T22"
});

const db = firebaseApp.firestore();

export { db };