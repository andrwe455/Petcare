// Import the functions you need from the SDKs you need
const {initializeApp} = require("firebase/app");
const {getAuth,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBEEJZZCebNqdlIG9CBSu_e2EvKBphd6Ko",
  authDomain: "monsters-university-eb70f.firebaseapp.com",
  projectId: "monsters-university-eb70f",
  storageBucket: "monsters-university-eb70f.appspot.com",
  messagingSenderId: "163958958033",
  appId: "1:163958958033:web:5aafd7fc4870fee689e2f0",
  measurementId: "G-FJ14Z7GYY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signIn = signInWithEmailAndPassword;
const logout = signOut;
const signup = createUserWithEmailAndPassword

module.exports = { 
    auth,
    signIn,
    logout,
    signup
};