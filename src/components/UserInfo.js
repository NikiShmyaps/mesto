export default class UserInfo {
  constructor ( {name, info} ) {
    this.name = document.querySelector(name)
    this.info = document.querySelector(info)
  }

  getUserInfo() {
    this.dataUsers = {
      name: this._name.textContent,
      info: this._info.textContent
    }

    return dataUsers
  }

  setUserInfo(name, info) {
    this._name.textContent = name
    this._info.textContent = info
  }
}