import firebase from 'firebase/app'
import 'firebase/storage'

  const firebaseConfig = {
    apiKey: "AIzaSyBxlLnETZNnlHTsrRAL4cFGN1UE3ly6HdQ",
    authDomain: "luxcom-hotel.firebaseapp.com",
    projectId: "luxcom-hotel",
    storageBucket: "luxcom-hotel.appspot.com",
    messagingSenderId: "739411191867",
    appId: "1:739411191867:web:e9b88a5396502f100dd41e",
    measurementId: "G-62KFRPQWSW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  export {storage, firebase as default};