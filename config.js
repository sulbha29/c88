import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyAUcMIUEGEmIooMsClSW1ZsZ7pOJahA_To",
  authDomain: "booksantagouri.firebaseapp.com",
  databaseURL: "https://booksantagouri.firebaseio.com",
  projectId: "booksantagouri",
  storageBucket: "booksantagouri.appspot.com",
  messagingSenderId: "764791065270",
  appId: "1:764791065270:web:7f690219eb63378b39b417"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();