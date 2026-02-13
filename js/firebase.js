// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg4tKdXYiJLjFvedn49MC9dXxcS-lMpws",
  authDomain: "unify-65d0b.firebaseapp.com",
  projectId: "unify-65d0b",
  storageBucket: "unify-65d0b.firebasestorage.app",
  messagingSenderId: "733787044539",
  appId: "1:733787044539:web:fc42802cf034bc28ca079e"
};

firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();
const realtimeDB = firebase.database(); // ✅ ADDED