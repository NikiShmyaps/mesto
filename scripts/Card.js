export class Card {
  constructor ( data, templateSelector, handleOpenPopup ) {
    this._title = data.name
    this._image = data.image
    this._templateSelector = templateSelector
    this._handleOpenPopup = handleOpenPopup
  }

  _handleLikeCard = () => {
    this._cardLikeBtn.classList.toggle('cards-grid__like-btn_active')
  }

  _handleTrashCard = () => {
    this._element.remove()
    this._element = null
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', () => this._handleLikeCard())
    this._cardTrashBtn.addEventListener('click', () => this._handleTrashCard())
    this._cardImg.addEventListener('click', () => this._handleOpenPopup(this._title, this._image))
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
    this._cardLikeBtn = this._element.querySelector('.cards-grid__like-btn')
    this._cardTrashBtn = this._element.querySelector('.cards-grid__trash-btn')
    this._cardImg = this._element.querySelector('.cards-grid__img')

    this._setEventListeners()

    this._element.querySelector('.cards-grid__title').textContent = this._title

    this._cardImg.src = this._image
    this._cardImg.alt = this._title

    return this._element
  }
}