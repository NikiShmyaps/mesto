import Popup from './Popup'

export default class PopupWithDelete extends Popup {
  constructor ( popupSelector ) {
    super(popupSelector)

    this._form = this._popup.querySelector('.form')  
  }

  setDeleteAction(action) {
    this._handleDelete = action
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleDelete()
    })
  }
}
