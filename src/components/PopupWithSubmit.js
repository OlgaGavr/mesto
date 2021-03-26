import { Popup } from './Popup.js';
export class PopupWithSubmit extends Popup {
    constructor(popupSelector,) {
      super({popupSelector});
      this._form = this._popup.querySelector('.form');
      // this._handleSubmitForm = handleSubmitForm;
      // this._removeCard = removeCard;
    }
  
    setHandler(handler) {
      this._handleSubmitForm = handler
    }

     setEventListeners() {
       super.setEventListeners();
       this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._handleSubmitForm(this._cardNew);
         super.closePopup();
       });
     }
    
     openPopup(cardNew) {

        super.openPopup();
        this._cardNew = cardNew;
     }
  }