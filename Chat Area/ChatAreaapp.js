// This is for Settings button 
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


settingsIcon.addEventListener("click", () =>{
    if(settingsDiv.style.display === "none" || settingsDiv.style.display === ""){
        settingsDiv.style.display = "block"; 
    } 
    else{
        settingsDiv.style.display = "none"; 
    }
})

chatThemeSelector.addEventListener("click", () =>{
    if(chatThemes.style.display === "none" || chatThemes.style.display === ""){
        chatThemes.style.display = "block";
    }
    else{
        chatThemes.style.display = "none";
    }
})


deleteAcc.addEventListener("click", () =>{
    if(request.style.display === "none" || request.style.display === ""){
        request.style.display = "block";
        settingsDiv.style.display = "none";
    }
    else{
        request.style.display = "none"; 
        settingsDiv.style.display = "none";
    }
    
})

confirmYes.addEventListener("click", ()=>{
    sendOff.style.display = "block";    // show parent box
    request.style.display = "none";
    settingsIcon.style.display = "none";
    settingsDiv.style.display = "none";
    chatBar.style.display = "none";
    sendOffYes.style.display = "block"; // show YES msg
    sendOffNo.style.display = "none";   // hide NO msg
})

confirmNo.addEventListener("click", ()=>{
    sendOff.style.display = "block";    // show parent box
    request.style.display = "none";
    settingsDiv.style.display = "none";
    sendOffNo.style.display = "block";  // show NO msg
    sendOffYes.style.display = "none";  // hide YES msg
    setTimeout(() => {
        sendOffNo.style.display = "none";
    }, 4000);
})



/// This is to get the Background gradient colors and also for the chat theme

function adjustColor(col, amount) {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return (usePound ? "#" : "") + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

colorPicker.addEventListener("input", (e) => {
  const baseColor = e.target.value;
  const darker = adjustColor(baseColor, -100); // darker version
  const lighter = adjustColor(baseColor, 60);  // lighter version
  body.style.background = `linear-gradient(to left, ${baseColor}, ${darker})`;
  chatArea.style.background = lighter;
  ConfirmColor.style.visibility = "visible";
});

ConfirmColor.addEventListener("click", () =>{
    settingsDiv.style.display = "none";
})

Defalut.addEventListener("click" , ()=>{
    body.style.background = `background: linear-gradient(to left, rgb(174, 49, 49), rgb(125, 30, 117), rgb(104, 74, 203));`;
    chatArea.style.background = "#f4f4f4";
    settingsDiv.style.display = "none"; 
})