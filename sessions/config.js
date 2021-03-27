import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWJ_keCW7d8FIf2tsXjJYUJ5S8YzAtJXQ",
  authDomain: "group-study-46a18.firebaseapp.com",
  projectId: "group-study-46a18",
  storageBucket: "group-study-46a18.appspot.com",
  messagingSenderId: "180030282139",
  appId: "1:180030282139:web:67c68722be98109fda293e"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };