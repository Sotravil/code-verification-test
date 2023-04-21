// Get the forms and error message elements
const usernameForm = document.getElementById("username-form");
const phoneForm = document.getElementById("phone-form");
const confirmationForm = document.getElementById("confirmation-form");
const chatSection = document.getElementById("chat");
const confirmationCodeInput = document.getElementById("confirmation-code-input");
const confirmationCodeForm = document.getElementById("confirmation-code-form");
const errorMessage = document.getElementById("error-message");
const usernameHeader = document.getElementById("username-header");
const phoneHeader = document.getElementById("phone-header");
const confirmationUsername = document.getElementById("confirmation-username");
const confirmationPhone = document.getElementById("confirmation-phone");
const backButton = document.getElementById("back-button");

let code;

function generateCode() {
  // Generate a 6-digit code
  code = Math.floor(100000 + Math.random() * 900000);

  // Create a Blob object to save the code as a text file
  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });

  // Create a temporary anchor element to download the file
  const anchor = document.createElement("a");
  anchor.download = "code.txt";
  anchor.href = window.URL.createObjectURL(blob);
  anchor.style.display = "none";
  document.body.appendChild(anchor);

  // Trigger a click event on the anchor element to download the file
  anchor.click();

  // Remove the anchor element
  document.body.removeChild(anchor);
}

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
  confirmationUsername.textContent = usernameHeader.textContent;
  confirmationPhone.textContent = phoneHeader.textContent;
  confirmationForm.classList.remove("hidden");
});

backButton.addEventListener("click", (event) => {
  event.preventDefault();
  confirmationForm.classList.add("hidden");
  phoneForm.classList.remove("hidden");
});

confirmationCodeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const confirmationCode = confirmationCodeInput.value;
  if (confirmationCode.trim() === "") {
    errorMessage.textContent = "Please enter a confirmation code";
    return;
  }
  if (confirmationCode === code.toString()) {
    confirmationForm.classList.add("hidden");
    chatSection.classList.remove("hidden");
  } else {
    errorMessage.textContent = "Invalid confirmation code";
  }
});

const chatMessages = document.getElementById("chat-messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message.trim() === "") {
    return;
  }
  const username = usernameHeader.textContent;
  const phoneNumber = phoneHeader.textContent;
  const timestamp = new Date().toLocaleTimeString();
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `
    <p><strong>${username}</strong> (${phoneNumber}) <span>${timestamp}</span></p>
    <p>${message}</p>
  `;
  chatMessages.appendChild(messageElement);
  messageInput.value = "";
});
