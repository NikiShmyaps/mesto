import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'

import { 
  editProfileBtn,
  profileNameInput,
  profileAboutInput,
  formProfile,
  formCard,
  addCardBtn,
  initialCards,
  config
} from '../utils/constants.js'

const userInfo = new UserInfo({
  name: '.profile__title',
  info: '.profile__subtitle'
})

const checkInfoFormProfile = ({name, info}) => {
  profileNameInput.value = name
  profileAboutInput.value = info
}

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_form_profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.name,
      info: data.info
    })
    popupProfile.close()
  }
})
popupProfile.setEventListeners()

editProfileBtn.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  checkInfoFormProfile({
    name: data.name,
    info: data.info
  })
  profileFormValidator.resetValidation()
  popupProfile.open()
})

const popupPicture = new PopupWithImage('.popup_picture')
popupPicture.setEventListeners()

const handleCardClick = (name, image) => {
  popupPicture.open(name, image)
}

const createCard = ( data ) => {
  const card = new Card (data, '.card-template', handleCardClick)
  const cardElement = card.generateCard()

  return cardElement
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item))
  },
}, '.cards-grid__container')

cardList.renderItems()

const popupFormCard = new PopupWithForm({
  popupSelector: '.popup_form_card',
  handleFormSubmit: (data) => {
    cardList.addItem(createCard(data))
    popupFormCard.close()
  }
})
popupFormCard.setEventListeners()

addCardBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation()
  popupFormCard.open()
})

const cardFormValidator = new FormValidator(config, formCard)
const profileFormValidator = new FormValidator(config, formProfile)

cardFormValidator.enableValidation()
profileFormValidator.enableValidation()