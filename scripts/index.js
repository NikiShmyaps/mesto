const popupProfile = document.querySelector('.popup_form_profile'),
  popupCard = document.querySelector('.popup_form_card'),
  editProfileBtn = document.querySelector('.profile__edit-button'),
  popupCloseProfile = document.querySelector('.popup__close_form_profile'),
  popupCloseCard = document.querySelector('.popup__close_form_card'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profileNameInput = document.querySelector('.popup__input_type_name'),
  profileAboutInput = document.querySelector('.popup__input_type_about'),
  cardTitleInput = document.querySelector('.popup__input_type_title'),
  cardLinkInput = document.querySelector('.popup__input_type_link'),
  formProfile = document.querySelector('.popup_form_profile'),
  formCard = document.querySelector('.popup_form_card'),
  cardTamplate = document.querySelector('.card-template'),
  cardsList = document.querySelector('.cards-grid__container')
  addCardBtn = document.querySelector('.profile__add-button'),
  popupPicture = document.querySelector('.popup_picture'),
  popupPictureImg = document.querySelector('.popup__image_picture'),
  popupPictureSubtitle = document.querySelector('.popup__subtitle_picture'),
  popupPictureCloseBtn = document.querySelector('.popup__close_picture');

const popupShow = ( popup ) => {
  popup.classList.add('popup_opened');
}
const popupHide = ( popup ) => {
  popup.classList.remove('popup_opened');
}

editProfileBtn.addEventListener('click', () => {
  popupShow(popupProfile);
  profileNameInput.value = profileTitle.textContent;
  profileAboutInput.value = profileSubtitle.textContent;
});

addCardBtn.addEventListener('click', () => {
  popupShow(popupCard);
  cardTitleInput.value = '';
  cardLinkInput.value = '';
});

popupCloseProfile.addEventListener('click', () => {
  popupHide(popupProfile);
});

popupCloseCard.addEventListener('click', () => {
  popupHide(popupCard);
});

popupPictureCloseBtn.addEventListener('click', () => {
  popupHide(popupPicture);
});

const addCard = (title, link) => {
  const cardItem = cardTamplate.content.cloneNode(true);

  cardItem.querySelector('.cards-grid__img').src = link;
  cardItem.querySelector('.cards-grid__title').textContent = title;
  cardItem.querySelector('.cards-grid__like-btn').addEventListener('click', (e) => {
    e.target.classList.toggle('cards-grid__like-btn_active')
  });
  cardItem.querySelector('.cards-grid__trash-btn').addEventListener('click', (e) => {
    e.target.closest('.cards-grid__item').remove();
  });
  cardItem.querySelector('.cards-grid__img').addEventListener('click', () => {
    popupPictureImg.src = link;
    popupPictureSubtitle.textContent = title;
    popupShow(popupPicture);
  })
  

  cardsList.prepend(cardItem);
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

const formSubmitEditProfile = (e) => {
  e.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileAboutInput.value;

  popupHide(popupProfile);
}

const formSubmitCard = (e) => {
  e.preventDefault();

  addCard(cardTitleInput.value, cardLinkInput.value)

  popupHide(popupCard);
}

formProfile.addEventListener('submit', formSubmitEditProfile);
formCard.addEventListener('submit', formSubmitCard)
