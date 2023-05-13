import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form')
    this._inputs = this._form.querySelectorAll('.popup__input')
    this._handleFormSubmit = handleFormSubmit
  }

  _getInputValues() {
    this.formInputValues = {}

    this._inputs.forEach(item => {
      this.formInputValues[item.name] = item.value
    })

    return this.formInputValues
  }

  setEventListeners() {
    super.setEventListeners()

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}