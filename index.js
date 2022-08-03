//selecting all collapse class elements
let collapsible = document.getElementsByClassName("collapse");
// hides or shows the collapsible forms when clicked
for (let i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", showOrHideCollapsible);
}

// showing employee id after adding employee
const employeeForm = document.getElementById("employeeForm");
employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    collapsible[0].click();
    collapsible[1].click();
    collapsible[0].innerText = `Employee created with empId: ${getRandomNumberBetween(100, 200)}`;
});


const employeeInputFields = document.getElementsByClassName("employeeInput");
const vehicleInputFields = document.getElementsByClassName("vehicleInput");
// showing first input field only for employee form, hiding all other fields
hideAllInputFieldsExcept(employeeInputFields, 0);

const addEmployeeBtn = document.getElementById('addEmployeeBtn');
addEmployeeBtn.style.display = 'none';
// hide employee form inputs first
hideOneByOne(employeeInputFields);

// showing first input field only for vehicle form, hiding all other fields
hideAllInputFieldsExcept(vehicleInputFields, 0);
const addVehicleBtn = document.getElementById('addVehicleBtn');
addVehicleBtn.style.display = 'none';
// hide vehicle form inputs
hideOneByOne(vehicleInputFields);
// show pricing card according to vehicle type selected 
const vehicleType = document.getElementById('vehicle-type');
addVehicleBtn.addEventListener('click', () => {
    collapsible[1].click();
    const pricingCards = document.getElementsByClassName('pricing-card');
    for (let index = 0; index < pricingCards.length; index++) {
        if (pricingCards[index].id != vehicleType.value) {
            pricingCards[index].style.display = 'none';
        }
    }
});

// change input border according to password strength
const inputPassword = document.getElementById('password');
inputPassword.addEventListener('keydown', () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(inputPassword.value.length < 8) {
        inputPassword.style.border = "2px solid red";
    }
    else if (inputPassword.length >= 8 && !inputPassword.value.match(passwordRegex)) {
        inputPassword.style.border = "2px solid orange";
    }
    else if (inputPassword.length >= 8 && inputPassword.value.match(passwordRegex)) {
        inputPassword.style.border = "2px solid green";
    }
});

// hides form elements and shows one by one
function hideOneByOne(inputFieldsArray) {
    for (let index = 0; index < inputFieldsArray.length;) {
        let element = inputFieldsArray[index];
        element.addEventListener("keypress", function (event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                let flag = true;
                /* checks for all validations and setting flag accordingly */
                if(inputFieldsArray[0].id == 'check1' && inputFieldsArray[0].style.display == 'block') {
                    flag = checkFullname(document.getElementById('fullname'));
                }
                if(inputFieldsArray[2].id == 'check2' && inputFieldsArray[2].style.display == 'block') {
                    flag = checkEmail(document.getElementById('email'));
                }
                if(inputFieldsArray[3].id == 'check3' && inputFieldsArray[3].style.display == 'block') {
                    flag = checkPassword(document.getElementById('password'));
                }
                if(inputFieldsArray[4].id == 'check4' && inputFieldsArray[4].style.display == 'block') {
                    flag = checkConfirmPassword(document.getElementById('confirm_password'));
                }
                if(inputFieldsArray[5].id == 'check5' && inputFieldsArray[5].style.display == 'block') {
                    flag = checkPhoneNumber(document.getElementById('phone'));
                }
                // only proceed if flag is true
                if(flag) {
                    if (inputFieldsArray[0].classList.contains('employeeInput') && index == 1) {
                        changeInputLabelEmployee();
                    }
                    if (inputFieldsArray[0].classList.contains('employeeInput') && index == 6) {
                        addEmployeeBtn.style.display = 'inline-block';
                    }
                    if (inputFieldsArray[0].classList.contains('vehicleInput') && index == 6) {
                        addVehicleBtn.style.display = 'inline-block';
                    }
                    hideAllInputFieldsExcept(inputFieldsArray, index);
                }
            }
        });
        index++;
    }
}

// looping through each collapse element and changing its maxHeight property
function showOrHideCollapsible() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

// hides all fields except the one with passed index of form
function hideAllInputFieldsExcept(inputFieldsArray, showIndex) {
    for (let index = 0; index < inputFieldsArray.length; index++) {
        if (index == showIndex) {
            inputFieldsArray[index].style.display = 'block';
        }
        else
            inputFieldsArray[index].style.display = 'none';
    }
}

// changes input field label for employee form
function changeInputLabelEmployee() {
    let employeeName = employeeInputFields[0].children.item(0).value;
    const employeeLabelTextFields = document.getElementsByClassName('employeeLabelText');
    for (let index = 0; index < employeeLabelTextFields.length; index++) {
        employeeLabelTextFields[index].innerText = `Hi ${employeeName} please enter your ${employeeLabelTextFields[index].innerText}`;
    }
}

// generates random employee id
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* validation functions for input fields using regex*/
function checkFullname(inputField) {
    const fullnameRegex = /^[^0-9]+$/;
    if(inputField.value.match(fullnameRegex) && inputField.value.length >= 2) {
        return true;
    }
    else {
        alert("Enter fullname (minimum 2 characters and no numbers allowed)");
        return false;
    }
}
function checkEmail(inputField) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(inputField.value.match(emailRegex)) {
        return true;
    }
    else {
        alert("Enter correct email");
        return false;
    }
}
function checkPhoneNumber(inputField) {
    const phoneRegex = /(6|7|8|9)\d{9}/;
    if(inputField.value.match(phoneRegex)) {
        return true;
    }
    else {
        alert("Enter valid phone number");
        return false;
    }
}
function checkPassword(inputPassword) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputPassword.value.match(passwordRegex)) {
        return true;
    }
    else {
        alert("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
        return false;
    }
}
function checkConfirmPassword(inputField) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputField.value.match(passwordRegex) && inputField.value == inputPassword.value) {
        return true;
    }
    else {
        alert("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
        return false;
    }
}

/* constant arrays for static values of used currencies */
const inrValues = ["100", "5", "100", "500", "200", "10", "200", "1000", "500", "20", "500", "3500"];
const usdValues = ["1.26", "0.063", "1.26", "6.32", "2.53", "0.13", "2.53", "12.64", "6.32", "0.25", "6.32", "44.25"];
const yenValues = ["169.46", "8.47", "169.46", "847.28", "338.91", "16.95", "338.91", "1694.57", "847.28", "33.59", "847.28", "5930.99"];
let currencySymbols = document.getElementsByClassName('currencySymbol');
let currencyValues = document.getElementsByClassName('currencyValue');

// function to find which currency to be changed into
function changeCurrency() {
    const selectedCurrency = document.getElementById('currencySelect');
    switch(selectedCurrency.value) {
        case "INR": inr();
                    break;
        case "USD": usd();
                    break;
        case "YEN": yen();
                    break;
    }
}

/* functions to convert currency values and show the symbols */
function inr() {
    for(let index = 0; index < 12; index++) {
        currencySymbols[index].innerText = `\u{20B9}`;
        currencyValues[index].innerText = inrValues[index];
    }
}
function usd() {
    for(let index = 0; index < 12; index++) {
        currencySymbols[index].innerText = "$";
        currencyValues[index].innerText = usdValues[index];
    }
}
function yen() {
    for(let index = 0; index < 12; index++) {
        currencySymbols[index].innerText = '\u{00A5}';
        currencyValues[index].innerText = yenValues[index];
    }
}