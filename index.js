//selecting all collapse class elements
let collapsible = document.getElementsByClassName("collapse");
console.log(collapsible);
// looping through each collapse element and changing its maxHeight property
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


// showing first input field only, hiding all other fields
const employeeInputFields = document.getElementsByClassName("employeeInput");
const vehicleInputFields = document.getElementsByClassName("vehicleInput");
console.log(employeeInputFields);
hideAllInputFieldsExcept(employeeInputFields, 0);
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
addEmployeeBtn.style.display = 'none';
hideOneByOne(employeeInputFields);
// addEmployeeBtn.addEventListener("click", collapseUncollapse());
hideAllInputFieldsExcept(vehicleInputFields, 0);
const addVehicleBtn = document.getElementById('addVehicleBtn');
addVehicleBtn.style.display = 'none';
hideOneByOne(vehicleInputFields);
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

function hideOneByOne(inputFieldsArray) {
    for (let index = 0; index < inputFieldsArray.length;) {
        let element = inputFieldsArray[index];
        console.log("before event " + index);
        element.addEventListener("keypress", function (event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                console.log("before calling hide " + index);
                let flag = true;
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
                    console.log("after calling hide " + index);
                }
            }
        });
        console.log(index);
        index++;
        console.log(index);
    }
}

function showOrHideCollapsible() {
    console.log(this);
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    console.log(content);
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

// hides all fields except the one with passed index
function hideAllInputFieldsExcept(inputFieldsArray, showIndex) {
    for (let index = 0; index < inputFieldsArray.length; index++) {
        if (index == showIndex) {
            inputFieldsArray[index].style.display = 'block';
        }
        else
            inputFieldsArray[index].style.display = 'none';
    }
}

function changeInputLabelEmployee() {
    let employeeName = employeeInputFields[0].children.item(0).value;
    const employeeLabelTextFields = document.getElementsByClassName('employeeLabelText');
    for (let index = 0; index < employeeLabelTextFields.length; index++) {
        employeeLabelTextFields[index].innerText = `Hi ${employeeName} please enter your ${employeeLabelTextFields[index].innerText}`;
    }
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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
    let inputPassword = document.getElementById('password');
    if (inputField.value.match(passwordRegex) && inputField.value == inputPassword.value) {
        return true;
    }
    else {
        alert("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
        return false;
    }
}