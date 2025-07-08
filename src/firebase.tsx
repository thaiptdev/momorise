import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk6e9s3752ALKPixrkzgxj9CRI66334rY",
  authDomain: "momorise-thaipt.firebaseapp.com",
  projectId: "momorise-thaipt",
  storageBucket: "momorise-thaipt.firebasestorage.app",
  messagingSenderId: "929981261668",
  appId: "1:929981261668:web:4980a24680f990d8fefc71",
  measurementId: "G-1PTV5F2YMS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export { app };
