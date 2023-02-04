const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClass)
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ''
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const disabledButton = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  buttonElement.classList.add(config.inactiveButtonClass)
  buttonElement.setAttribute('disabled', 'disabled')
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.removeAttribute('disabled');
  }
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, config)
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
      disabledButton(formElement, config)
    })
    setEventListeners(formElement, config)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
})