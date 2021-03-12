import { profileName, profileAbout } from '../utils/constants.js';
export class UserInfo {
    constructor(Name, About) {
      this._Name = Name;
      this._About = About;
    }

    getUserInfo() { 
      const user = {
        name: this._Name,
        link: this._About
      };
      return user;
    }

    setUserInfo() {
      profileName.textContent = this._Name;
      profileAbout.textContent =  this._About;
    }
}