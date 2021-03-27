export class Card{
  constructor (myId, {card, handlPreviewCard, handleLikeClick, handleDeleteIconClick, cardLike}, cardSelector) {
    this._card = card;
    this._myId = myId;
    this._name = card.name;
    this._link = card.link;
    this._likes = Array.from(card.likes).map((item) => {return item._id});
    this._owner = card.owner;
    this._cardId = card.cardId
    this._cardSelector = cardSelector;
    this._handlPreviewCard = handlPreviewCard;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._isLike = cardLike
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
    this._cardLikeButton = this._element.querySelector('.button_action_like');
   
    this._cardDelButton = this._element.querySelector('.button_action_delete');
    this._cardLikes = this._element.querySelector('.card__likes');
    this._cardLikes.textContent = this._likes.length;
    if (this._likes.includes(this._myId)) {
      this._cardLikeButton.classList.add('button_action_like-active');
      this._isLike = true
    }  else this._isLike = false;
    if (this._myId !== this._owner) {this._handlDdeleteCard(this._cardDelButton)}

    return this._element;
  }

  isLike(ArrUserId){
    if (ArrUserId.includes(this._myId)) {
      this._isLike = true
      return this._isLike
    } else {
      this._isLike = false;
      return this._isLike;
    }
  }

  updateLikes(ArrUserId) {
    this._cardLikes.textContent = ArrUserId.length;
    this._element.querySelector('.button_action_like').classList.toggle('button_action_like-active');
    this._isLike = this.isLike(ArrUserId);
  }

  deleteCard() {
     this._handlDdeleteCard(this._element); 
  }

  _handlDdeleteCard(element) {
    element.remove();
    element = null;
  }
  
  _setEventListeners() {
    this._element.querySelector('.button_action_like').addEventListener('click', () => {this._handleLikeClick(this._isLike)});
    this._element.querySelector('.button_action_delete').addEventListener('click', () => {this._handleDeleteIconClick(this._card)});
    this._cardElementImage.addEventListener('click', () => {this._handlPreviewCard(this._name, this._link)}); 
  }
}