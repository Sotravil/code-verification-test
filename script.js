// Get form elements
const usernameForm = document.getElementById("username-form");
const phoneForm = document.getElementById("phone-form");
const confirmationForm = document.getElementById("confirmation-form");

// Get input elements
const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");
const confirmationCodeInput = document.getElementById("confirmation-code-input");

// Get confirmation elements
const confirmationUsername = document.getElementById("confirmation-username");
const confirmationPhone = document.getElementById("confirmation-phone");

// Get chat elements
const chatContainer = document.getElementById("chat-container");
const usernameHeader = document.getElementById("username-header");
const phoneHeader = document.getElementById("phone-header");
const messageBox = document.querySelector(".message-box");
const sendBtn = document.querySelector(".send-btn");

// Handle form submissions
usernameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  phoneForm.style.display = "block";
  usernameForm.style.display = "none";
});

phoneForm.addEventListener("submit", (event) => {
  event.preventDefault();
  confirmationUsername.textContent = usernameInput.value;
  confirmationPhone.textContent = phoneInput.value;
  confirmationForm.style.display = "block";
  phoneForm.style.display = "none";
});

confirmationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  chatContainer.style.display = "block";
  confirmationForm.style.display = "none";
  usernameHeader.textContent = usernameInput.value;
  phoneHeader.textContent = phoneInput.value;
});

// Handle going back to phone number form
const backLink = document.querySelector(".back-link");
backLink.addEventListener("click", () => {
  confirmationForm.style.display = "none";
  phoneForm.style.display = "block";
});

// Handle sending a message
sendBtn.addEventListener("click", () => {
  const message = messageBox.querySelector("input").value;
  if (message) {
    const sentMessage = document.createElement("div");
    sentMessage.classList.add("message", "sent");
    sentMessage.innerHTML = `<p>${message}</p>`;
    const chat = chatContainer.querySelector(".chat");
    chat.appendChild(sentMessage);
    messageBox.querySelector("input").value = "";
  }
});
