export class UserInfo {
    constructor({selectorName, selectorAbout, selectorAvatar}) {
      this._name = document.querySelector(selectorName);
      this._about = document.querySelector(selectorAbout);
      this._avatar = document.querySelector(selectorAvatar);
    }

    getUserInfo() { 
      const user = {
        name: this._name.textContent,
        link: this._about.textContent
      };
      return user;
    }

    setUserInfo(name, about) {
      this._name.textContent = name;
      this._about.textContent =  about;
    }

    setUserAvatar(avatar) {
      this._avatar.src = avatar;
    }
}