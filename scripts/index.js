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
  formProfile = document.querySelector('.popup_form_profile'),
  formCard = document.querySelector('.popup_form_card'),
  cardTamplate = document.querySelector('.card-template'),
  cardsContainer = document.querySelector('.cards-grid__container'),
  addCardBtn = document.querySelector('.profile__add-button'),
  popupPicture = document.querySelector('.popup_picture'),
  popupPictureImg = document.querySelector('.popup__image'),
  popupPictureSubtitle = document.querySelector('.popup__subtitle');

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
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape)
}

editProfileBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  profileNameInput.value = profileTitle.textContent;
  profileAboutInput.value = profileSubtitle.textContent;
});

addCardBtn.addEventListener('click', () => {
  openPopup(popupCard);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', closePopupOverlay);
  button.addEventListener('click', () => closePopup(popup));
});

const createCard = ( title, link ) => {
  const cardElement = cardTamplate.content.cloneNode(true);
  const img = cardElement.querySelector('.cards-grid__img');

  img.src = link;
  img.alt = title;
  cardElement.querySelector('.cards-grid__title').textContent = title;
  cardElement.querySelector('.cards-grid__like-btn').addEventListener('click', (e) => {
    e.target.classList.toggle('cards-grid__like-btn_active')
  });
  cardElement.querySelector('.cards-grid__trash-btn').addEventListener('click', (e) => {
    e.target.closest('.cards-grid__item').remove();
  });
  img.addEventListener('click', () => {
    popupPictureImg.src = link;
    popupPictureImg.alt = title;
    popupPictureSubtitle.textContent = title;
    openPopup(popupPicture);
  })

  return cardElement
}

const addCard = ( title, link ) => {
  const cardItem = createCard( title, link );
  cardsContainer.prepend(cardItem);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(item => {
  addCard( item.name, item.link )
});

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileAboutInput.value;

  closePopup(popupProfile);
}

const handleCardFormSubmit = (e) => {
  e.preventDefault();

  addCard(cardTitleInput.value, cardLinkInput.value)

  closePopup(popupCard);
  e.target.reset()
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);
