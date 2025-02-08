const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;
const noWordPasswordRegex = 

function validatePassword(password) {
    return passwordRegex.test(password)
}

const registerForm = document.getElementById("registration")

registerForm.addEventListener("submit", validatePassword)


let form = document.getElementById("registration")
let username = form.elements.username
form.addEventListener("submit", function(e){
    e.preventDefault()
    if(new Set(username.value).size < 2){
        console.log("The username must contain at least 2 unique characters");
        
    }
    
})

//!=========================================================== DOM MANIPULATION: PT 2 LAB =============================================================== */




