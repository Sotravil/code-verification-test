// Get the forms and error message elements
const usernameForm = document.getElementById("username-form");
const phoneForm = document.getElementById("phone-form");
const confirmationForm = document.getElementById("confirmation-form");
const backButton = document.getElementById("back-button");
const chat = document.getElementById("chat");
const usernameHeader = document.getElementById("username-header");
const phoneHeader = document.getElementById("phone-header");
const errorMessage = document.getElementById("error-message");

// Set the initial state of the forms
phoneForm.classList.add("hidden");
confirmationForm.classList.add("hidden");

// Generate a 6-digit code and download the code file
function generateCode() {
  const code = Math.floor(100000 + Math.random() * 900000);
  const file = new Blob([code.toString()], { type: "text/plain" });
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = "code.txt";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

// Handle form submissions
usernameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = event.target.elements.username.value;
  if (username.trim() === "") {
    errorMessage.textContent = "Please enter a username";
    return;
  }
  usernameHeader.textContent = username;
  usernameForm.classList.add("hidden");
  phoneForm.classList.remove("hidden");
});

phoneForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const phoneNumber = event.target.elements.phone.value;
  if (phoneNumber.trim() === "") {
    errorMessage.textContent = "Please enter a phone number";
    return;
  }
  phoneHeader.textContent = phoneNumber;
  generateCode();
  phoneForm.classList.add("hidden");
  confirmationForm.classList.remove("hidden");
});

confirmationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = event.target.elements.code.value;
  if (code.trim() === "") {
    errorMessage.textContent = "Please enter the confirmation code";
    return;
  }
  // You can add your own logic to verify the code here
  confirmationForm.classList.add("hidden");
  chat.classList.remove("hidden");
});

// Handle back button click
backButton.addEventListener("click", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";
  confirmationForm.classList.add("hidden");
  phoneForm.classList.remove("hidden");
});

// Handle message submission
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messageList = document.getElementById("message-list");

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message !== "") {
    const li = document.createElement("li");
    li.textContent = message;
    messageList.appendChild(li);
    messageInput.value = "";
  }
});
