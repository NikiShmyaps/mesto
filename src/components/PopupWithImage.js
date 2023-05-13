import Popup from './Popup'

export default class PopupWithImage extends Popup {
  constructor ( popupSelector ) {
    super(popupSelector)

    this._popupImageCaption = this._popup.querySelector('.popup__subtitle')
    this._popupImage = this._popup.querySelector('.popup__image')
  }

  open(name, image) {
    this._popupImage.src = image
    this._popupImage.alt = name
    this._popupImageCaption.textContent = name
    super.open()
  }
}