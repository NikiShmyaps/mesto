export class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._config.errorClass)
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = ''
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _disabledButton() {
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector)
    if (buttonElement) {
      buttonElement.classList.add(this._config.inactiveButtonClass)
      buttonElement.setAttribute('disabled', 'disabled')
    }
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass)
      buttonElement.setAttribute('disabled', 'disabled')
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(formElement, inputElement)
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._form, inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._disabledButton()
    })
    this._setEventListeners()
  }
}