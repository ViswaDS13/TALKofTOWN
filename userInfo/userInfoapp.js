// ----------------------------
// Firebase SDK imports
// ----------------------------
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

// ----------------------------
// Firebase config
// ----------------------------
const firebaseConfig = {
    apiKey: "AIzaSyA5x5aib61iGtI_REZNNvS-_ClA-g6OEFY",
    authDomain: "chat-project-talkoftown.firebaseapp.com",
    projectId: "chat-project-talkoftown",
    storageBucket: "chat-project-talkoftown.firebasestorage.app",
    messagingSenderId: "833443503115",
    appId: "1:833443503115:web:03302535248c646b30fb0e",
    measurementId: "G-HS4TSFR6D0"
};

// ----------------------------
// Initialize Firebase
// ----------------------------
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ----------------------------
// Helper function to add user to Firestore
// ----------------------------
async function addUserToFirestore(uid, email) {
    const userRef = doc(db, "userDetails", "preSetFileDoNotDelete", "Userinfo", uid);
    await setDoc(userRef, {
        email: email,
        createdAt: new Date()
    });
}

// ----------------------------
// Email/Password Signup
// ----------------------------
document.getElementById("signup").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await addUserToFirestore(userCredential.user.uid, email);
        alert("Signed up successfully: " + email);
    } catch (err) {
        alert(err.message);
    }
});

// ----------------------------
// Email/Password Login
// ----------------------------
document.getElementById("login").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "userDetails", "preSetFileDoNotDelete", "Userinfo", userCredential.user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            alert("User does not exist in Firestore!");
            return;
        }

        alert("Logged in successfully: " + email);
    } catch (err) {
        alert(err.message);
    }
});

// ----------------------------
// Google Login
// ----------------------------
document.getElementById("googleLogin").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "userDetails", "preSetFileDoNotDelete", "Userinfo", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await addUserToFirestore(user.uid, user.email);
        }

        alert("Google login successful: " + user.email);
    } catch (err) {
        alert(err.message);
    }
});

// ----------------------------
// Auth state listener
// ----------------------------
onAuthStateChanged(auth, user => {
    if (user) {
        console.log("User logged in:", user.email);
    } else {
        console.log("No user logged in");
    }
});
