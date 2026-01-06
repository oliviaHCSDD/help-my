import { auth } from "./app.js";
import { onAuthStateChanged, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const errorBox = document.getElementById("error");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "./admin.html";
  } catch (err) {
    errorBox.textContent = err.message;
  }
});

// حماية الصفحة
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);
  }
});
