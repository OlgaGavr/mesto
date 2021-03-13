export class UserInfo {
    constructor({selectorName, selectorAbout}) {
      this._Name = document.querySelector(selectorName);
      this._About = document.querySelector(selectorAbout);;
    }

    getUserInfo() { 
      const user = {
        name: this._Name.textContent,
        link: this._About.textContent
      };
      return user;
    }

    setUserInfo(name, about) {
      this._Name.textContent = name;
      this._About.textContent =  about;
    }
}