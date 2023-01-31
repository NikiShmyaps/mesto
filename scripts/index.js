const popupProfile = document.querySelector('.profile-popup'),
  popupCard = document.querySelector('.card-popup'),
  editProfileBtn = document.querySelector('.profile__edit-button'),
  popupCloseProfile = document.querySelector('.profile-popup__close'),
  popupCloseCard = document.querySelector('.card-popup__close'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profileTitleInput = document.querySelector('.profile-popup__input_type_name'),
  profileSubtitleInput = document.querySelector('.profile-popup__input_type_about'),
  cardTitleInput = document.querySelector('.card-popup__input_type_name'),
  cardSubtitleInput = document.querySelector('.card-popup__input_type_about'),
  formProfile = document.querySelector('.profile-popup__form'),
  formCard = document.querySelector('.card-popup__form'),
  cardTamplate = document.querySelector('.card-template'),
  cardsList = document.querySelector('.cards-grid__container')
  addCardBtn = document.querySelector('.profile__add-button'),
  popupPicture = document.querySelector('.popup-picture'),
  popupPictureImg = document.querySelector('.popup-picture__image'),
  popupPictureSubtitle = document.querySelector('.popup-picture__subtitle'),
  popupPictureCloseBtn = document.querySelector('.popup-picture__close-btn');

const popupShow = ( popup ) => {
  popup.classList.add('popup_opened');
}
const popupHide = ( popup ) => {
  popup.classList.remove('popup_opened');
}

editProfileBtn.addEventListener('click', () => {
  popupShow(popupProfile);
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
});

addCardBtn.addEventListener('click', () => {
  popupShow(popupCard);
  cardTitleInput.value = '';
  cardSubtitleInput.value = '';
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

  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;

  popupHide(popupProfile);
}

const formSubmitCard = (e) => {
  e.preventDefault();

  addCard(cardTitleInput.value, cardSubtitleInput.value)

  popupHide(popupCard);
}

formProfile.addEventListener('submit', formSubmitEditProfile);
formCard.addEventListener('submit', formSubmitCard)
