import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const popupProfile = document.querySelector('.popup_form_profile'),
  popupCard = document.querySelector('.popup_form_card'),
  editProfileBtn = document.querySelector('.profile__edit-button'),
  closeButtons = document.querySelectorAll('.popup__close'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profileNameInput = document.querySelector('.popup__input_type_name'),
  profileAboutInput = document.querySelector('.popup__input_type_about'),
  cardTitleInput = document.querySelector('.popup__input_type_title'),
  cardLinkInput = document.querySelector('.popup__input_type_link'),
  formProfile = document.querySelector('.popup__form_type_profile'),
  formCard = document.querySelector('.popup__form_type_card'),
  cardsContainer = document.querySelector('.cards-grid__container'),
  addCardBtn = document.querySelector('.profile__add-button'),
  popupPicture = document.querySelector('.popup_picture'),
  popupImage = popupPicture.querySelector('.popup__image'),
  popupImageCaption = popupPicture.querySelector('.popup__subtitle')

const closePopupEscape = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

const closePopupOverlay = (e) => {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target)
  }
}

const openPopup = ( popup ) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEscape)
}
const closePopup = ( popup ) => {
  if (popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupEscape)
  }
}

editProfileBtn.addEventListener('click', () => {
  openPopup(popupProfile)
  profileNameInput.value = profileTitle.textContent
  profileAboutInput.value = profileSubtitle.textContent
})

addCardBtn.addEventListener('click', () => {
  openPopup(popupCard)
})

closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  popup.addEventListener('mousedown', closePopupOverlay)
  button.addEventListener('click', () => closePopup(popup))
})

const handleOpenPopup = (name, image) => {
  popupImage.src = image;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupPicture); 
}

const createCard = ( data ) => {
  const card = new Card (data, '.card-template', handleOpenPopup)
  const cardElement = card.generateCard()

  return cardElement
}

const addCard = ( data ) => {
  cardsContainer.append(createCard(data))
}

const initialCards = [
  {
    name: 'Архыз',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

initialCards.forEach( data => {
  addCard( data )
})

const handleProfileFormSubmit = (e) => {
  e.preventDefault()

  profileTitle.textContent = profileNameInput.value
  profileSubtitle.textContent = profileAboutInput.value

  closePopup(popupProfile)
}

const handleCardFormSubmit = (e) => {
  e.preventDefault()

  addCard({
    name: cardTitleInput.value,
    image: cardLinkInput.value
  })

  closePopup(popupCard)
  e.target.reset()
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const cardFormValidator = new FormValidator(config, formCard)
const profileFormValidator = new FormValidator(config, formProfile)

cardFormValidator.enableValidation()
profileFormValidator.enableValidation()

popupProfile.addEventListener('submit', handleProfileFormSubmit)
popupCard.addEventListener('submit', handleCardFormSubmit)
