import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'

import { 
  popupProfile,
  popupCard,
  editProfileBtn,
  closeButtons,
  profileTitle,
  profileSubtitle,
  profileNameInput,
  profileAboutInput,
  cardTitleInput,
  cardLinkInput,
  formProfile,
  formCard,
  cardsContainer,
  addCardBtn,
  popupPicture,
  popupImage,
  popupImageCaption
} from '../utils/constants.js';

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
  profileFormValidator.resetValidation()
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
  cardsContainer.prepend(createCard(data))
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
