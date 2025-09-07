
const settingsIcon = document.querySelector("#settingsIcon");
const settingsDiv = document.querySelector("#settingsPanel");
const chatThemeSelector = document.querySelector("#themeSelector");
const chatThemes = document.querySelector("#Themes");
const deleteAcc = document.querySelector("#Delete");
const request = document.querySelector("#RequestBox");
const sendOff = document.querySelector("#sendOff");
const sendOffYes = document.querySelector("#forYes");
const sendOffNo = document.querySelector("#forNo");
const confirmYes = document.querySelector("#yesDelete");
const confirmNo = document.querySelector("#noDelete");
const chatBar = document.querySelector("#chatBar");
const chatArea = document.querySelector(".ChatArea");
const body = document.body;
const colorPicker = document.querySelector("#colorPalete");
const Defalut = document.querySelector("#Defalut");
const ConfirmColor = document.querySelector("#ConfirmColor");


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  collectionGroup,
  where,
  serverTimestamp,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5x5aib61iGtI_REZNNvS-_ClA-g6OEFY",
  authDomain: "chat-project-talkoftown.firebaseapp.com",
  projectId: "chat-project-talkoftown",
  storageBucket: "chat-project-talkoftown.appspot.com",
  messagingSenderId: "833443503115",
  appId: "1:833443503115:web:03302535248c646b30fb0e",
  measurementId: "G-HS4TSFR6D0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const favEmailInput = document.querySelector("#favEmailInput");
const favSlotSelect = document.querySelector("#favSlotSelect");
const setFavBtn = document.querySelector("#setFavBtn");
const messagesBox = document.querySelector("#messagesBox");
const messageInput = document.querySelector("#messageInput");
const sendMessageBtn = document.querySelector("#sendMessageBtn");
const favDivs = document.querySelectorAll("#chatBar .favorites");


let currentUser = null;
let currentChatId = null;
let unsubscribeMessages = null;

const userDocPath = (uid) => ["Users", uid];

const getChatId = (uidA, uidB) => "chat_" + [uidA, uidB].sort().join("_");

// Find a user by email
async function findUserByEmail(email) {
  const q = query(collection(db, "Users"), where("email", "==", email));
  const snaps = await getDocs(q);
  if (snaps.empty) return null;
  return { uid: snaps.docs[0].id, data: snaps.docs[0].data() };
}


async function setFavorite(slot, email) {
  if (!currentUser) return alert("Sign in first");

  const found = await findUserByEmail(email);
  if (!found) return alert("No user with that email");

  const userDocPath = (uid) => ["Users", uid];
  await setDoc(
    userRef,
    {
      favorites: { [slot]: { uid: found.uid, email } },
    },
    { merge: true }
  );

  favDivs.forEach((div) => {
    if (div.textContent.includes(slot.replace("fav", "Fav "))) {
      div.innerHTML = `<img src="./src/favorites_temp.png" class="pfp"> ${email}`;
      div.addEventListener("click", () => openChatWithUid(found.uid, email));
    }
  });

  const favSetup = document.getElementById("favSetup");
  if (favSetup) favSetup.style.display = "none";

  openChatWithUid(found.uid, email);
}


async function openChatWithUid(otherUid, otherEmail) {
  if (unsubscribeMessages) unsubscribeMessages();
  currentChatId = getChatId(currentUser.uid, otherUid);
  messagesBox.innerHTML = "";

  const q = query(
    collection(db, "chats", currentChatId, "messages"),
    orderBy("timestamp", "asc")
  );
  unsubscribeMessages = onSnapshot(q, (snap) => {
    messagesBox.innerHTML = "";
    snap.forEach((docSnap) => {
      const msg = docSnap.data();
      const div = document.createElement("div");
      div.className = msg.sender === currentUser.uid ? "me" : "them";
      div.textContent = msg.text;
      messagesBox.appendChild(div);
    });
    messagesBox.scrollTop = messagesBox.scrollHeight;
  });
}

async function sendMessage() {
  if (!currentChatId) return alert("Choose a favorite to chat");
  const text = messageInput.value.trim();
  if (!text) return;
  const msgRef = collection(db, "chats", currentChatId, "messages");
  await addDoc(msgRef, {
    sender: currentUser.uid,
    text,
    timestamp: serverTimestamp(),
  });
  messageInput.value = "";
}


setFavBtn.addEventListener("click", () => {
  setFavorite(favSlotSelect.value, favEmailInput.value.trim());
});

sendMessageBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});


onAuthStateChanged(auth, async (user) => {
  currentUser = user || null;
  if (!currentUser) return;

  const userDocPath = (uid) => ["Users", uid];
  const snap = await getDoc(userRef);
  if (snap.exists() && snap.data().favorites) {
    Object.entries(snap.data().favorites).forEach(([slot, fav]) => {
      favDivs.forEach((div) => {
        if (div.textContent.includes(slot.replace("fav", "Fav "))) {
          div.innerHTML = `<img src="./src/favorites_temp.png" class="pfp"> ${fav.email}`;
          div.addEventListener("click", () =>
            openChatWithUid(fav.uid, fav.email)
          );
        }
      });
    });
  }
});


settingsIcon.addEventListener("click", () => {
  settingsDiv.style.display =
    settingsDiv.style.display === "none" ? "block" : "none";
});

chatThemeSelector.addEventListener("click", () => {
  chatThemes.style.display =
    chatThemes.style.display === "none" ? "block" : "none";
});

ConfirmColor.addEventListener("click", () => {
  body.style.background = colorPicker.value;
});

Defalut.addEventListener("click", () => {
  body.style.background =
    "linear-gradient(to left, rgb(174, 49, 49), rgb(125, 30, 117), rgb(104, 74, 203))";
});
