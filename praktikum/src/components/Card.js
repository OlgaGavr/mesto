export class Card{
  constructor (card, {handlPreviewCard}, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._handlPreviewCard = handlPreviewCard;
  } 

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;  
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__text').textContent = this._name;
    this._cardElementImage = this._element.querySelector('.card__image');
    this._setEventListeners();
    this._cardElementImage.alt = this._name;
    this._cardElementImage.src = this._link;
    return this._element;
  }

  _handleLikeCard() {
    this._element.querySelector('.button_action_like').classList.toggle('button_action_like-active');
  }

  _handlDdeleteCard() {
    this._element.remove();
  }
  
  _setEventListeners() {
    this._element.querySelector('.button_action_like').addEventListener('click', () => {this._handleLikeCard()});
    this._element.querySelector('.button_action_delete').addEventListener('click', () => {this._handlDdeleteCard()});
    this._cardElementImage.addEventListener('click', () => {this._handlPreviewCard(this._name, this._link)}); 
 
  }
}