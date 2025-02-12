const registerForm = document.getElementById("registration")
const errorDisplay = document.getElementById("errorDisplay")

//regular expressions
const usernameRegex = /^[a-zA-Z0-9]{4,}$/; //at least 4 charachters long and only use letters and numbers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
const restrictedEmailDomain = /@example\.com$/i; // Prevents "example.com" emails
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/; // must be at least 12 charachters long and include a uppercase, lowercase, special character and number
const noWordPasswordRegex = /password/i; //cant use the word password in your password

// function to show errors
function showError(message){
    errorDisplay.innerText = message;
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "red";
}

//function to show success message 
function showSuccess(message){
    errorDisplay.innerText = message;
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "green"
}


//Function to clear errors
function clearError(){
    errorDisplay.innerText = "";
    errorDisplay.style.display ="none"
}

//validation function
registerForm.addEventListener("submit", function (e){
    e.preventDefault();

    clearError(); //reset error display

    let username = registerForm.elements.username.value.trim();
    let email = registerForm.elements.email.value.trim().toLowerCase();
    let password = registerForm.elements.password.value;
    let passwordCheck = registerForm.elements.passwordCheck.value;
    let termsAccepted = registerForm.elements.terms.checked;

    //username validation
    if (username === "") {
        showError("The username cannot be blank.");
        return;
    }
    if (!usernameRegex.test(username)) {
        showError("The username must be at least 4 characters long and contain only letters and numbers.");
        return;
    }
    if (new Set(username).size < 2) {
        showError("Username must contain at least 2 unique characters.");
        return;
    }


    //check if the username is not already taken or exsist in the local stoarge 
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username.toLowerCase()]) {
        showError("That username is already taken.");
        return;
    }

    //Email Validation 
    if (!emailRegex.test(email)) {
        showError("Please enter a valid email address.");
        return;
    }
    if (restrictedEmailDomain.test(email)) {
        showError("Email must be a valid email address.");
        return;
    }

    //password validation
    if (!passwordRegex.test(password)) {
        showError("Password must be at least 12 charcters long, contain an uppercase letter, a lowercase letter, a number, and a special charachter.");
        return;
    }
    if (noWordPasswordRegex.test(password)) {
        showError("Password cannot contain the word password.");
        return;
    }
    if (password.toLowerCase().includes(username.toLowerCase())) {
        showError("Password cannot contain the username");
        return;
    }
    if (password !== passwordCheck) {
        showError("Passwords do not match");
        return;
    }

    //Checking terms and conditions 
    if (!termsAccepted) {
        showError("You must accept terms and conditions.");
        return;
    }

    // Store user in localStorage
    users[username.toLowerCase()] = {email, password}; //stores the username in lowercase
    localStorage.setItem("users", JSON.stringify(users));

    // Clear form fields after a successful registration
    registerForm.reset();
    showSuccess("you have successfully submitted your form!")
});









// function validatePassword(password) {
//     return passwordRegex.test(password)
// }




// let form = document.getElementById("registration")
// let username = form.elements.username
// form.addEventListener("submit", function(e){
//     e.preventDefault()
//     if(new Set(username.value).size < 2){
//         console.log("The username must contain at least 2 unique characters");
        
//     }
    
// })





