import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super({popupSelector});
    this._name = name;
    this._link = link;
  }

  openPopup() {
    super.openPopup();
    this._popup.querySelector('.popup__image').src = this._link;
    this._popup.querySelector('.popup__caption').textContent = this._name;
    this._popup.querySelector('.popup__image').alt = this._name;
  }

}
