export default class Popup {
  constructor ( popupSelector ) {
    this._popup = popupSelector
    this._closePopupEscape = this._handleEscClose.bind(this)
    this._closeBtn = this._popup.querySelector('.popup__close')
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._closePopupEscape)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._closePopupEscape)
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  _closePopupOverlay(e) {
    if (e.target.classList.contains('popup')) {
      this.close()
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close())
    this._popup.addEventListener('mousedown', (e) => this._closePopupOverlay(e))
  }
}