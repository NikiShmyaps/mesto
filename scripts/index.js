const popup = document.querySelector('.popup'),
  editProfileBtn = document.querySelector('.profile__edit-button'),
  popupCloseBtn = document.querySelector('.popup__close-btn'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profileTitleInput = document.querySelector('.popup__input_type_name'),
  profileSubtitleInput = document.querySelector('.popup__input_type_about'),
  form = document.querySelector('.popup__form'),
  cardTamplate = document.querySelector('.card-template'),
  cardsList = document.querySelector('.cards-grid__container')
  addCardBtn = document.querySelector('.profile__add-button'),
  popupPicture = document.querySelector('.popup-picture'),
  popupPictureImg = document.querySelector('.popup-picture__image'),
  popupPictureSubtitle = document.querySelector('.popup-picture__subtitle'),
  popupPictureCloseBtn = document.querySelector('.popup-picture__close-btn');

const popupShow = (
  elem,
  title,
  titlePlaceholder,
  btnTitle,
  btnPlaceholder,
  inputTitle = '',
  inputSubtitle = ''
) => {
  elem.classList.add('popup_opened');
  profileTitleInput.placeholder = titlePlaceholder;
  profileSubtitleInput.placeholder = btnPlaceholder;
  elem.querySelector('.popup__title').textContent = title;
  elem.querySelector('.popup__btn').textContent = btnTitle;
  profileTitleInput.value = inputTitle;
  profileSubtitleInput.value = inputSubtitle;
}
const popupHide = (elem) => {
  elem.classList.remove('popup_opened');
  elem.removeAttribute('id');
}

editProfileBtn.addEventListener('click', () => {
  popupShow(
    popup,
    'Редактировать профиль',
    'Имя',
    'Сохранить',
    'О себе',
    profileTitle.textContent,
    profileSubtitle.textContent
  );
  popup.id = 'editProfile';
});

addCardBtn.addEventListener('click', () => {
  popupShow(
    popup,
    'Новое место',
    'Название',
    'Создать',
    'Ссылка на картинку'
  );
  popup.id = 'addCard';
});

popupCloseBtn.addEventListener('click', () => {
  popupHide(popup);
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
    popupPicture.classList.add('popup_opened');
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

const formSubmitHandler = (e) => {
  e.preventDefault();

  if ( popup.id === 'editProfile' ) {
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
  } else if ( popup.id === 'addCard' ) {
    addCard(profileTitleInput.value, profileSubtitleInput.value)
  }

  popupHide(popup);
}
form.addEventListener('submit', formSubmitHandler)
