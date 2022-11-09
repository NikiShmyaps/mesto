const popup = document.querySelector('.popup'),
  editProfileBtn = document.querySelector('.profile__edit-button'),
  popupCloseBtn = document.querySelector('.popup__form-close'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profileTitleInput = document.getElementById('name'),
  profileSubtitleInput = document.getElementById('about'),
  formBtn = document.getElementById('send'),
  form = document.getElementById('profile_form');


const popupShow = (popupClassName) => {
  popupClassName.classList.add('popup_opened');
}
const popupHide = (popupClassName) => {
  popupClassName.classList.remove('popup_opened');
}

const formSubmitHandler = (e) => {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;

  popupHide(popup);
}


editProfileBtn.addEventListener('click', () => {
  popupShow(popup);

  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
});

popupCloseBtn.addEventListener('click', () => {
  popupHide(popup);
});

form.addEventListener('submit', formSubmitHandler);