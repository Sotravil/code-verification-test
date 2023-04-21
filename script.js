const signupForm = document.querySelector('#signup-form');
const confirmationForm = document.querySelector('#confirmation-form');
const chatPage = document.querySelector('#chat-page');
const userSpan = document.querySelector('#user');

signupForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = signupForm.username.value;
	const phone = signupForm.phone.value;
	sendConfirmationCode(username, phone);
});

confirmationForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const confirmationCode = confirmationForm['confirmation-code'].value;
	verifyConfirmationCode(confirmationCode);
});

function sendConfirmationCode(username, phone) {
	// Here, you would send a 6-digit code to the provided phone number using a service like Twilio
	// For the purpose of this example, we'll generate a random code and display it in the console
	const code = Math.floor(Math.random() * 900000) + 100000;
	console.log(`Code sent to ${phone}: ${code}`);

	// Display the chat page with the user's name and a message about the confirmation code
	userSpan.textContent = username;
	signupForm.reset();
	chatPage.classList.remove('hidden');
}

function verifyConfirmationCode(code) {
	// Here, you would verify the user's provided code with the code that was sent to their phone
	// For the purpose of this example, we'll assume the code is correct and display a message in the console
	console.log('Confirmation code verified!');
}
