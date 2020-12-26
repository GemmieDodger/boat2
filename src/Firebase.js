import firebase from 'firebase/app';
import 'firebase/firestore'
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBGlkRTKuhU6VoMy8OAUdEJnzk1vUDZtps",
  authDomain: "boat2-b2019.firebaseapp.com",
  databaseURL: "https://boat2-b2019-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "boat2-b2019",
  storageBucket: "boat2-b2019.appspot.com",
  messagingSenderId: "990646186891",
  appId: "1:990646186891:web:7223deb587f259694b758e"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;

