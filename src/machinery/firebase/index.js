import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {

  apiKey: "AIzaSyCLK-4amHIIpnpSk5phh_FZDr4-zu1JBog",

  authDomain: "luxcom-hotel-admin.firebaseapp.com",

  projectId: "luxcom-hotel-admin",

  storageBucket: "luxcom-hotel-admin.appspot.com",

  messagingSenderId: "516912338451",

  appId: "1:516912338451:web:1ac2ed7a62714ebcc6d1e6"

};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  export {storage, firebase as default};