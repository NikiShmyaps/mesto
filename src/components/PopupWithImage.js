import Popup from './Popup'

export default class PopupWithImage extends Popup {
  constructor ( popupSelector ) {
    super(popupSelector)

    this._popupImageCaption = this._popup.querySelector('.popup__subtitle')
    this._popupImage = this._popup.querySelector('.popup__image')
  }

  open(data) {
    this._popupImage.src = data.link
    this._popupImage.alt = data.name
    this._popupImageCaption.textContent = data.name
    super.open()
  }
}