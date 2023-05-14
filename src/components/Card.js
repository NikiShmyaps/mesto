export default class Card {
  constructor ({
    data,
    userId,
    handleCardClick,
    handleDeleteCard,
    handleAddLike ,
    handleDeleteLike
  }, templateSelector ) 
  {
    this._title = data.name
    this._image = data.link
    this._likes = data.likes
    this._id = data._id
    this._owner = data.owner._id
    this._userId = userId
    this._handleCardClick = handleCardClick
    this._handleDeleteCard = handleDeleteCard
    this._handleAddLike = handleAddLike
    this._handleDeleteLike = handleDeleteLike
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards-grid__item')
      .cloneNode(true)

    return cardElement
  }

  getId() {
    return this._id;
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._cardLikeBtn.classList.toggle('cards-grid__like-btn_active');
    this._likeCounter.textContent = this._likes.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkLike() {
    if (this._cardLikeBtn.classList.contains('cards-grid__like-btn_active')) {
      this._handleDeleteLike(this._id);
    } else {
      this._handleAddLike(this._id);
    }
  }

  _checkTrash() {
    if (this._owner !== this._userId) {
      this._cardTrashBtn.remove();
    }
  }

  _isLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._cardLikeBtn.classList.add('cards-grid__like-btn_active');
    }
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick()
    })
    this._cardTrashBtn.addEventListener('click', () => {
      this._handleDeleteCard();
    })
    this._cardLikeBtn.addEventListener('click', () => {
      this._checkLike()
    });
  }
  
  generateCard() {
    this._element = this._getTemplate()
    this._cardLikeBtn = this._element.querySelector('.cards-grid__like-btn')
    this._likeCounter = this._element.querySelector('.cards-grid__like-counter')
    this._cardTrashBtn = this._element.querySelector('.cards-grid__trash-btn')
    this._cardImg = this._element.querySelector('.cards-grid__img')

    this._setEventListeners()
    this._checkTrash()
    this._isLiked()

    this._element.querySelector('.cards-grid__title').textContent = this._title

    this._cardImg.src = this._image
    this._cardImg.alt = this._title
    this._likeCounter.textContent = this._likes.length

    return this._element
  }
}