import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCKHW5NtpCxpoDW6uWa6kYKLb96BU6KWiE',
  authDomain: 'muni-doc.firebaseapp.com',
  projectId: 'muni-doc',
  storageBucket: 'muni-doc.appspot.com',
  messagingSenderId: '344634604345',
  appId: '1:344634604345:web:7c81b9a8d8804448fb46e8',
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
