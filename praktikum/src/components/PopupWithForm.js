import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmitForm}) {
    super({popupSelector});
    this._poupName = this._popup.querySelector('.popup__field_text_name');
    this._poupLink = this._popup.querySelector('.popup__field_text_about');
    this._form = this._popup.querySelector('.form');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    const inputValue = {
      name: this._poupName.value,
      link: this._poupLink.value,
    };
    return inputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

}
