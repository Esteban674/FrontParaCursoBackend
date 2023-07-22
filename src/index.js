import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';




// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDEIPXm-BXZMUEGNzvarJofkQqW5YietPA",
//   authDomain: "e-commerce-perea.firebaseapp.com",
//   projectId: "e-commerce-perea",
//   storageBucket: "e-commerce-perea.appspot.com",
//   messagingSenderId: "456312581933",
//   appId: "1:456312581933:web:d1ba447fcf78e918c46da4"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


