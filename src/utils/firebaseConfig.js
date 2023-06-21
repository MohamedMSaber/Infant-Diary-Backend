// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiYGsQsraMjSqFeYzQbnv0lAmuFCh1QBE",
    authDomain: "infant-diary.firebaseapp.com",
    projectId: "infant-diary",
    storageBucket: "infant-diary.appspot.com",
    messagingSenderId: "997726529374",                                                                                                                                                                                                                                                               
    appId: "1:997726529374:web:bb0db1e93f63beb34151cf"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(firebaseApp);

// Export the Firestore instance
module.exports = db;