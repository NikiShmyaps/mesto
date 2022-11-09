const popup = document.querySelector('.popup'),
  editProfileBtn = document.querySelector('.profile__edit-button'),
  popupCloseBtn = document.querySelector('.popup__close-btn'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profileTitleInput = document.querySelector('.popup__form-input_type-name'),
  profileSubtitleInput = document.querySelector('.popup__form-input_type-about'),
  formBtn = document.querySelector('.popup__form-btn'),
  form = document.querySelector('.popup__form');


const popupShow = (elem) => {
  elem.classList.add('popup_opened');

  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}
const popupHide = (elem) => {
  elem.classList.remove('popup_opened');
}

const formSubmitHandler = (e) => {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;

  popupHide(popup);
}


editProfileBtn.addEventListener('click', () => {
  popupShow(popup);
});

popupCloseBtn.addEventListener('click', () => {
  popupHide(popup);
});

form.addEventListener('submit', formSubmitHandler);