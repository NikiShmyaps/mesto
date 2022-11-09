const popup = document.querySelector('.popup'),
  editProfileBtn = document.querySelector('.profile__edit-button'),
  popupCloseBtn = document.querySelector('.popup__form-close'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profileTitleInput = document.getElementById('name'),
  profileSubtitleInput = document.getElementById('about'),
  formBtn = document.getElementById('send'),
  form = document.getElementById('profile_form');


const formSubmitHandler = (e) => {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;

  popup.classList.remove('popup_opened');
}


editProfileBtn.addEventListener('click', () => {
  popup.classList.add('popup_opened');

  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
});

popupCloseBtn.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

form.addEventListener('submit', formSubmitHandler);