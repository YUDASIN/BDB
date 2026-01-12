
// 1. מייבאים את הספריות מהאינטרנט (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// 2. ההגדרות שלך (כאן אתה מדביק את המפתח פעם אחת!)
const firebaseConfig = {
  apiKey: "AIzaSyDgU8HrSiI2l3WAAoZ1WcB1Rgs4SYEUBBc",
  authDomain: "bdb-bible-ratings.firebaseapp.com",
  projectId: "bdb-bible-ratings",
  storageBucket: "bdb-bible-ratings.firebasestorage.app",
  messagingSenderId: "931047373276",
  appId: "1:931047373276:web:ada62fb6c74101aae3b719",
  measurementId: "G-Y0M5JPE6TY"
};

// 3. אתחול המערכת
const app = initializeApp(firebaseConfig);

// 4. ייצוא הכלים החוצה כדי שקבצים אחרים יוכלו להשתמש בהם
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();