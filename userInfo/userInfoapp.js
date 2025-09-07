import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA5x5aib61iGtI_REZNNvS-_ClA-g6OEFY",
  authDomain: "chat-project-talkoftown.firebaseapp.com",
  projectId: "chat-project-talkoftown",
  storageBucket: "chat-project-talkoftown.firebasestorage.app",
  messagingSenderId: "833443503115",
  appId: "1:833443503115:web:03302535248c646b30fb0e",
  measurementId: "G-HS4TSFR6D0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// 🔹 Add user to Firestore
async function addUserToFirestore(uid, email) {
  const userRef = doc(db, "users", uid); // ✅ simple users collection
  await setDoc(userRef, {
    email: email,
    createdAt: new Date()
  });
}

// 🔹 Signup
document.getElementById("signup").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) return alert("Enter email & password");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await addUserToFirestore(userCredential.user.uid, email);
    alert("Signed up: " + email);
  } catch (err) {
    alert(err.message);
  }
});

// 🔹 Login
document.getElementById("login").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) return alert("Enter email & password");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", userCredential.user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return alert("User not in Firestore!");
    alert("Logged in: " + email);
  } catch (err) {
    alert(err.message);
  }
});

// 🔹 Google Login
document.getElementById("googleLogin").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) await addUserToFirestore(user.uid, user.email);
    alert("Google login: " + user.email);
  } catch (err) {
    alert(err.message);
  }
});

// 🔹 Auth listener
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});
