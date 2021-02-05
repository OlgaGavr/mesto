
const configValidation = {
    formSelector: '.form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.button_action_save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
  };

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

const resetError = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach(inputElement => hideInputError(formElement, inputElement, config)); 
};
  
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
};
  
const isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
};
  
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
};

const buttonOff = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}    

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, config);
    });
    
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
};
  
enableValidation(configValidation);