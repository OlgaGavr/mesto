import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});
    this._name = this._popup.querySelector('.popup__caption');
    this._link = this._popup.querySelector('.popup__image');
  }

  openPopup(name, link) {
    super.openPopup();
    this._link.src = link;
    this._name.textContent = name;
    this._name.alt = name;
  }

}
