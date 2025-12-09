// Declaring a configuration object that contains the
// necessary classes and selectors. 
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
}

const hideInputError = (formEl, inputEl, settings) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(settings.inputErrorClass);
}

const showInputError = (formEl, inputEl, errorMsg, settings) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(settings.inputErrorClass);
}

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage)
    } else {
        hideInputError(formEl, inputEl);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonEl) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonEl);
    } else {
        enableButton(buttonEl);
    }
}

const resetValidation = (formEl, inputList) => {
    inputList.forEach((input) => {
        hideInputError(formEl, input);
    });
}

const disableButton = (buttonEl, settings) => {
    buttonEl.disabled = true;
    buttonEl.classList.add(settings.inactiveButtonClass);
}

const enableButton = (buttonEl, settings) => {
    buttonEl.disabled = false;
    buttonEl.classList.remove(settings.inactiveButtonClass);
}

const setEventListeners = (formEl, settings) => {
    const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
    const buttonEl = formEl.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonEl, settings);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            checkInputValidity(formEl, inputEl);
            toggleButtonState(inputList, buttonEl);
        });
    });
}

const enableValidation = (settings) => {
    const formList = document.querySelectorAll(settings.formSelector);
    console.log(formList);
    formList.forEach((formEl) => {
        setEventListeners(formEl, settings);
    })
}

// Passing the configuration object to enableValidation when we call it.
enableValidation(settings);