// app.js (Firebase + Data Layer) — يعمل على GitHub Pages بدون npm

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore, collection, doc, getDoc, onSnapshot,
  addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Firebase Config (من مشروعك)
const firebaseConfig = {
  apiKey: "AIzaSyD5c4maRwuXA8ZnwTa6JHQ6PcT5tE5ODY",
  authDomain: "my-html-app-e06ff.firebaseapp.com",
  projectId: "my-html-app-e06ff",
  storageBucket: "my-html-app-e06ff.firebasestorage.app",
  messagingSenderId: "970956317798",
  appId: "1:970956317798:web:60f582049daec9aeb639a7"
};

// Init
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Refs
export const profilesCol = collection(db, "profiles");
export const settingsRef = doc(db, "app", "settings");

// Auth helpers
export function watchAuth(cb) {
  return onAuthStateChanged(auth, cb);
}
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export async function logout() {
  return signOut(auth);
}

// Settings
export async function getSettings() {
  const snap = await getDoc(settingsRef);
  if (snap.exists()) return snap.data();
  return {
    appTitle: "قائمة البروفايلات",
    appSubtitle: "اختاري بروفايل للانتقال إلى صفحة بلوجر",
    openInNewTab: false
  };
}
export async function saveSettings(s) {
  await setDoc(settingsRef, {
    appTitle: s.appTitle ?? "قائمة البروفايلات",
    appSubtitle: s.appSubtitle ?? "",
    openInNewTab: !!s.openInNewTab,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

// Profiles (live)
export function liveProfiles(cb) {
  const q = query(profilesCol, orderBy("order", "asc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export async function createProfile(p) {
  return addDoc(profilesCol, {
    name: (p.name || "").trim(),
    subtitle: (p.subtitle || "").trim(),
    avatar: (p.avatar || "").trim(),
    url: (p.url || "").trim(),
    verified: !!p.verified,
    status: p.status === "online" ? "online" : "offline",
    order: Number.isFinite(+p.order) ? +p.order : 9999,
    active: p.active !== false, // افتراضي: true
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
export async function updateProfile(id, p) {
  return updateDoc(doc(db, "profiles", id), {
    name: (p.name || "").trim(),
    subtitle: (p.subtitle || "").trim(),
    avatar: (p.avatar || "").trim(),
    url: (p.url || "").trim(),
    verified: !!p.verified,
    status: p.status === "online" ? "online" : "offline",
    order: Number.isFinite(+p.order) ? +p.order : 9999,
    active: p.active !== false,
    updatedAt: serverTimestamp(),
  });
}
export async function deleteProfile(id) {
  return deleteDoc(doc(db, "profiles", id));
}
