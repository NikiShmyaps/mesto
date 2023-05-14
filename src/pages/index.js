import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithDelete from '../components/PopupWithDelete.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

import {
  editAvatarBtn,
  editProfileBtn,
  profileNameInput,
  profileAboutInput,
  formProfile,
  formCard,
  formAvatar,
  addCardBtn,
  config
} from '../utils/constants.js'

// Из-за выходных куратор не смог выдать токен
// в понедльник утром сразу поправлю
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '4efae440-5715-4ca9-8417-962742ac588e',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

const deletePopup = new PopupWithDelete('.popup_delete-card');
deletePopup.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__title',
  info: '.profile__subtitle',
  avatar: '.profile__avatar-img'
})

const checkInfoFormProfile = ({name, info}) => {
  profileNameInput.value = name
  profileAboutInput.value = info
}

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_form_profile',
  handleFormSubmit: (data) => {
    popupProfile.loading(true)
    api.updateUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupProfile.loading(false);
      })
  }
})
popupProfile.setEventListeners()

editProfileBtn.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  checkInfoFormProfile({
    name: data.name,
    info: data.info
  })
  popupProfile.open()
})

const popupPicture = new PopupWithImage('.popup_picture')
popupPicture.setEventListeners()

const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.updateAvatar(data)
      .then((data) => {
        userInfo.updateAvatar(data.avatar)
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
})
editAvatarPopup.setEventListeners();

editAvatarBtn.addEventListener('click', () => {
  editAvatarPopup.open();
})


const createCard = ( data ) => {
  const card = new Card ({
    data: data,
    userId: userInfo.getUserId(),
    handleCardClick: () => {
      popupPicture.open(data)
    },
    handleDeleteCard: () => {
      deletePopup.open()
      deletePopup.setDeleteAction(() => {
        api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            deletePopup.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      })
    },
    handleAddLike: () => {
      api.addLike(card.getId())
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    },
    handleDeleteLike: () => {
      api.deleteLike(card.getId())
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  }, '.card-template')
  const cardElement = card.generateCard()

  return cardElement
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item))
  },
}, '.cards-grid__container')

const popupFormCard = new PopupWithForm({
  popupSelector: '.popup_form_card',
  handleFormSubmit: (data) => {
    popupFormCard.loading(true);
    api.addNewCard(data)
      .then((data) => {
        cardList.addItem(createCard(data))
        popupFormCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupFormCard.loading(false);
      })
  }
})
popupFormCard.setEventListeners()

addCardBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation()
  popupFormCard.open()
})

const cardFormValidator = new FormValidator(config, formCard)
const profileFormValidator = new FormValidator(config, formProfile)
const avatarFormValidator = new FormValidator(config, formAvatar)

cardFormValidator.enableValidation()
profileFormValidator.enableValidation()
avatarFormValidator.enableValidation()