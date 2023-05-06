export class Card {
  constructor ( data, templateSelector ) {
    this._title = data.name
    this._image = data.image
    this._templateSelector = templateSelector
  }

  _handleLikeCard = (e) => {
    e.target.classList.toggle('cards-grid__like-btn_active')
  }

  _handleTrashCard = (e) => {
    e.target.closest('.cards-grid__item').remove()
  }

  _closePopupEscape = (e) => {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      if (openedPopup) {
        openedPopup.classList.remove('popup_opened')
      }
    }
  }

  _handlePicture = () => {
    const popupImg = document.querySelector('.popup__image')
    popupImg.src = this._image
    popupImg.alt = this._title
    popupImg.textContent = this._title
    
    document.querySelector('.popup_picture').classList.add('popup_opened')
  }

  _setEventListeners() {
    this._element.querySelector('.cards-grid__like-btn').addEventListener('click', this._handleLikeCard)
    this._element.querySelector('.cards-grid__trash-btn').addEventListener('click', this._handleTrashCard)
    this._element.querySelector('.cards-grid__img').addEventListener('click', this._handlePicture)

    document.addEventListener('keydown', this._closePopupEscape)
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards-grid__item')
      .cloneNode(true)

    return cardElement
  }
  
  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector('.cards-grid__title').textContent = this._title

    this._element.querySelector('.cards-grid__img').src = this._image
    this._element.querySelector('.cards-grid__img').alt = this._title

    return this._element
  }
}