export default class UserInfo {
  constructor ({ name, info, avatar }) {
    this._name = document.querySelector(name)
    this._info = document.querySelector(info)
    this._avatar = document.querySelector(avatar)
  }

  getUserInfo() {
    const dataUsers = {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    }

    return dataUsers
  }

  setUserInfo(data) {
    this._name.textContent = data.name
    this._info.textContent = data.about
    this._id = data._id
    this._avatar.src = data.avatar
  }

  getUserId() {
    return this._id;
  }
}