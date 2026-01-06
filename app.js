// app.js — Firebase init for GitHub Pages (NO npm, NO analytics)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ✅ Firebase Config (من Firebase Console → Project settings → Web app)
const firebaseConfig = {
  apiKey: "AIzaSyD5c4maRwuxA8zNwTa6JhQQ6PcT5tE5ODY",
  authDomain: "my-html-app-e06ff.firebaseapp.com",
  projectId: "my-html-app-e06ff",
  storageBucket: "my-html-app-e06ff.firebasestorage.app",
  messagingSenderId: "970956317798",
  appId: "1:970956317798:web:60f582049daec9aeb639a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
