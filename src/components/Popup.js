export class Popup {
  constructor ({popupSelector}) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupByClickOnOverlay = this._closePopupByClickOnOverlay.bind(this);
  } 
 
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._closePopupByClickOnOverlay);
  } 

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._closePopupByClickOnOverlay);
  }
  
  setEventListeners() {
    this._popup.querySelector('.button_action_close').addEventListener('click', () => this.closePopup());
    this._popup.addEventListener('click', (evt) => this._closePopupByClickOnOverlay(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup()
    }
  }

  _closePopupByClickOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        this.closePopup()
    }
  }
}
