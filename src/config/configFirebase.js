// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseApp = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAXp90jIj66ZrBYRbRLB-saQM0PP2kvHPk',
    authDomain: 'admin-lenteopia.firebaseapp.com',
    projectId: 'admin-lenteopia',
    storageBucket: 'admin-lenteopia.appspot.com',
    messagingSenderId: '850330604864',
    appId: '1:850330604864:web:c4a8dd6d7de3fa336616a5',
    measurementId: 'G-M0TDY70JC1',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
};

export default FirebaseApp;
