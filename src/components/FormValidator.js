export default class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form
  }

  _showInputError = () => {
    const errorElement = this._form.querySelector(`.${this._inputElement.id}-error`)
    this._inputElement.classList.add(this._config.inputErrorClass)
    errorElement.textContent = this._inputElement.validationMessage
    errorElement.classList.add(this._config.errorClass)
  }

  _hideInputError = () => {
    const errorElement = this._form.querySelector(`.${this._inputElement.id}-error`)
    this._inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = ''
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _inactiveButton = () => {
    this._buttonElement.classList.add(this._config.inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', 'disabled')
  }

  _activeButton = () => {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass)
    this._buttonElement.removeAttribute('disabled')
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._inactiveButton()
    } else {
      this._activeButton()
    }
  }

  _checkInputValidity = () => {
    if (!this._inputElement.validity.valid) {
      this._showInputError()
    } else {
      this._hideInputError()
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector)
    this._toggleButtonState()
    
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement
      inputElement.addEventListener('input', () => {
        this._checkInputValidity()
        this._toggleButtonState()
      })
    })
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._inactiveButton()
    })
    this._setEventListeners()
  }

  resetValidation() {
    this._inactiveButton()
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement))
  }
}