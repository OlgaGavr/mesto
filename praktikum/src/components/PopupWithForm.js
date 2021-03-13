import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmitForm}) {
    super({popupSelector});
    this._form = this._popup.querySelector('.form');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
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
