import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGeODDJEBGcCMGdw_JE0pjvNvKn_KMZWI",
  authDomain: "crud-homework-3edaf.firebaseapp.com",
  databaseURL: "https://crud-homework-3edaf.firebaseio.com",
  projectId: "crud-homework-3edaf",
  storageBucket: "crud-homework-3edaf.appspot.com",
  messagingSenderId: "684747891140",
  appId: "1:684747891140:web:39bc7d03d27cd96ec84491",
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
