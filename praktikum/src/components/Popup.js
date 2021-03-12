export class Popup {
  constructor ({popupSelector}) {
    this._popup = document.querySelector(popupSelector);
  } 
 
  closePopup() {
    this._popup.classList.remove('popup_opened');
  //  document.removeEventListener('keydown', this._handleEscClose());
  }
     
  openPopup() {
    this._popup.classList.add('popup_opened');
  
  } 

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.closePopup()
      }
    })
  }

  setEventListeners() {
    this._popup.querySelector('.button_action_close').addEventListener('click', () => this.closePopup());
    document.addEventListener('keydown', this._handleEscClose(this._popup));
    document.addEventListener('click', this._closePopupByClickOnOverlay(this._popup));
  }

  _closePopupByClickOnOverlay() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup()
      }
    })
  }
}
