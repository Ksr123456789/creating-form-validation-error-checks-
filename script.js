const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const ageInput = document.querySelector("#age");
const form = document.getElementById("form-validation");
const phoneContainer = document.getElementById("phoneContainer");
const addMoreNo = document.getElementById("addPhoneBtn");
const genderContainer = document.getElementById("genderContainer");
const termsInput = document.getElementById("terms");
const termsError = document.getElementById("termsError");

const data = [];

function addPhoneNumber() {
  const div = document.createElement("div");
  div.innerHTML = `
   <input class="phone-input" type="text" />
   <button type="button" class="remove-phone">remove</button>
   <small class="error"></small>
  `;
  const ele = div.querySelector(".phone-input");

  ele.addEventListener("blur", function () {
    validateSinglePhone(ele);
  });

  ele.addEventListener("input", function () {
    validateSinglePhone(ele);
  });

  phoneContainer.appendChild(div);
}
addPhoneNumber();
addMoreNo.addEventListener("click", () => {
  addPhoneNumber();
  document.querySelector("#PhoneError").textContent = "";
});

phoneContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-phone")) {
    e.target.parentElement.remove();
  }
});

function validateSinglePhone(input) {
  const num = input.value.trim();

  if (num === "") {
    showError(input, "Please enter the number");
    return false;
  }
  if (!/^\d{10}$/.test(num)) {
    showError(input, "number must of 10 digits");
    return false;
  }
  removeError(input);
  return true;
}
function showError(input, errorMessage) {
  const element = input.parentElement.querySelector(".error");
  input.classList.add("error-border");
  element.textContent = errorMessage;
}
function removeError(input) {
  const element = input.parentElement.querySelector(".error");
  input.classList.remove("error-border");
  element.textContent = "";
}

function validateName() {
  const value = nameInput.value.trim();
  const regex = /^[A-Za-z ]{3,}$/;

  if (value === "") {
    showError(nameInput, "Please enter the name");
    return false;
  }
  if (!regex.test(value)) {
    showError(nameInput, "only letters, minimum 3 characters");
    return false;
  }
  removeError(nameInput);
  return true;
}

function validateEmail() {
  console.log("inside mail function");
  const value = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === "") {
    showError(emailInput, "Please enter the email");
    return false;
  }
  if (!regex.test(value)) {
    showError(emailInput, "enter the valid email format");
    return false;
  }
  removeError(emailInput);
  return true;
}

function validateAge() {
  const value = ageInput.value.trim();

  if (value === "") {
    showError(ageInput, "Please enter the age");
    return false;
  }
  if (!isFinite(value) || value < 1 || value > 120) {
    showError(ageInput, "Enter a Number, number>=1 & number<=120");

    return false;
  }
  removeError(ageInput);
  return true;
}
function validatePassword() {
  const value = passwordInput.value.trim();
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (value === "") {
    showError(passwordInput, "Password is required");
    return false;
  }

  if (!regex.test(value)) {
    showError(passwordInput, "Min 8 chars, 1 uppercase & 1 number");
    return false;
  }

  removeError(passwordInput);
  return true;
}

function validateGender() {
  const gender = document.querySelector("input[name='gender']:checked");
  const errorElement = document.getElementById("genderError");
  if (!gender) {
    errorElement.innerText = "select the gender";
    errorElement.classList.add("error");
    return false;
  }
  errorElement.innerText = "";
  errorElement.classList.remove("error");
  return true;
}

function validatePhone() {
  console.log("inside phone validate function");
  const phoneInputs = document.querySelectorAll(".phone-input");
  console.log(phoneInputs);
  if (phoneInputs.length === 0) {
    document.querySelector("#PhoneError").textContent =
      "enter atleast one phone Number";
    return false;
  }
  let isValid = true;
  phoneInputs.forEach((phone) => {
    if (!validateSinglePhone(phone)) isValid = false;
  });
  return isValid;
}
function validateTerms() {
  if (!termsInput.checked) {
    termsError.textContent = "You must accept the terms";
    return false;
  }
  termsError.textContent = "";
  return true;
}

//on blur
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
ageInput.addEventListener("blur", validateAge);
passwordInput.addEventListener("blur", validatePassword);

//check inputs constantly
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
genderContainer.addEventListener("change", validateGender);
termsInput.addEventListener("change", validateTerms);

function collectFormData() {
  const phones = [];
  document.querySelectorAll(".phone-input").forEach((phone) => {
    phones.push(phone.value.trim());
  });

  const gender = document.querySelector("input[name='gender']:checked")?.value;

  return {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
    age: ageInput.value.trim(),
    gender: gender,
    phones: phones,
    termsAccepted: termsInput.checked,
  };
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(`inside the form`);
  let isValid =
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateAge() &&
    validateGender() &&
    validatePhone() &&
    validateTerms();
  if (!isValid) return;
  const userData = collectFormData();
  data.push(userData);
  localStorage.setItem("userInfo", JSON.stringify(data));
});
