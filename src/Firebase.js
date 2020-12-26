import firebase from 'firebase/app';
import 'firebase/firestore'
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDajJG4U9UkF7D6gR8AFt6KlaPBw-1fBrA",
  authDomain: "boat-8b6ba.firebaseapp.com",
  projectId: "boat-8b6ba",
  storageBucket: "boat-8b6ba.appspot.com",
  messagingSenderId: "114622342287",
  appId: "1:114622342287:web:90a4437869480710867cfa"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;

