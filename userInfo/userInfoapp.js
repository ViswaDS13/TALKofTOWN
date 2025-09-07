// After including all necessary imports...

// Utility functions for showing/hiding UI
function showLoginUI() {
  document.getElementById("Details").style.display = "block";
  document.querySelector("main.ChatArea").style.display = "none";
}

function showChatUI() {
  document.getElementById("Details").style.display = "none";
  document.querySelector("main.ChatArea").style.display = "block";
}

// Wrap your login/signup logic
document.getElementById("signup").addEventListener("click", async () => {
  // ... your existing sign-up code
  alert("Signed up successfully: " + email);
  showChatUI();
});

document.getElementById("login").addEventListener("click", async () => {
  // ... your existing login code
  alert("Logged in successfully: " + email);
  showChatUI();
});

document.getElementById("googleLogin").addEventListener("click", async () => {
  // ... your existing Google sign-in code
  alert("Google login successful: " + user.email);
  showChatUI();
});

// On auth state change
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("User logged in:", user.email);
    showChatUI();
  } else {
    console.log("No user logged in");
    showLoginUI();
  }
});
