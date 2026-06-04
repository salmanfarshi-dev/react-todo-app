// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCprQPpFvyG5SJJV7VeZaToRTPrqyqkSlQ",
  authDomain: "device-streaming-fabfafcc.firebaseapp.com",
  databaseURL: "https://device-streaming-fabfafcc-default-rtdb.firebaseio.com",
  projectId: "device-streaming-fabfafcc",
  storageBucket: "device-streaming-fabfafcc.firebasestorage.app",
  messagingSenderId: "717943196192",
  appId: "1:717943196192:web:ebc69f4f37fc3f6eb88a45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig ;