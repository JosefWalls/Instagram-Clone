import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBa9mJ8nKDJK4tEMxk9V49khVcSE8hmkdE",
    authDomain: "instagram-5c6a7.firebaseapp.com",
    projectId: "instagram-5c6a7",
    storageBucket: "instagram-5c6a7.appspot.com",
    messagingSenderId: "48581361891",
    appId: "1:48581361891:web:09b454d53eb7cc00c3c5d6",
    measurementId: "G-NWX48MPFV6"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};