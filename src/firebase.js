import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
    
    apiKey: "AIzaSyCKenWzz-c9DvQIVunOffvnjAT9hVdlLRs",
    authDomain: "social-app-5fd95.firebaseapp.com",
    projectId: "social-app-5fd95",
    storageBucket: "social-app-5fd95.appspot.com",
    messagingSenderId: "367283303083",
    appId: "1:367283303083:web:34ada06b872393a8befdee",
    measurementId: "G-GBVD8E8M4F"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export  {db,auth,storage};