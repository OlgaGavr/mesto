const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const editButton = document.querySelector('.button_action_edit');
const addButton = document.querySelector('.button_action_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPreview = document.querySelector('.popup_type_preview');
const closeButtonAdd = document.querySelector('.button_action_close-add');
const closeButtonEdit = document.querySelector('.button_action_close-edit');
const closeButtonPreview = document.querySelector('.button_action_close-preview');
const formEdit = popupEdit.querySelector('.form');
const formAdd = popupAdd.querySelector('.form');
const popupImage = popupPreview.querySelector('.popup__image');
const popupCaption = popupPreview.querySelector('.popup__caption');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupName = formEdit.querySelector('.popup__field_text_name');
const popupAbout = formEdit.querySelector('.popup__field_text_about');
const popupNameAdd = formAdd.querySelector('.popup__field_text_name');
const popupLink = formAdd.querySelector('.popup__field_text_about');

const itemTemplate = document.querySelector('.item-template').content;
const cards = document.querySelector('.cards');

function render(){
  initialCards.forEach(renderCard);
}

function renderCard(card){
  const cardElement = itemTemplate.cloneNode(true);
  cardElement.querySelector('.card__text').textContent = card.name;
  cardElement.querySelector('.card__text').alt = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.button_action_like').addEventListener('click', likeCard);
  cardElement.querySelector('.button_action_delete').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', previewCard);
  cards.prepend(cardElement);
}

function likeCard(evt){
  evt.target.classList.toggle('button_action_like-active');
}

function closePopup(evt) {
  popupNameAdd.value = '';
  popupLink.value = '';
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function previewCard(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.closest('.card').querySelector('.card__text').textContent;
  popupImage.alt = evt.target.closest('.card').querySelector('.card__text').textContent;
  openPopup(popupPreview);
}

function openPopup(popupParam) {
  if (popupParam === popupEdit) {
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
  }
  popupParam.classList.add('popup_opened');
  
}

function handleSubmitEdit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileAbout.textContent =  popupAbout.value;
  closePopup(evt);
}

function handleSubmitAdd (evt) {
  evt.preventDefault();
  const cardAdd = {
    name: popupNameAdd.value,
    link: popupLink.value
  }  
  renderCard(cardAdd);
  closePopup(evt);
}

editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));
closeButtonAdd.addEventListener('click', closePopup);
closeButtonEdit.addEventListener('click', closePopup);
closeButtonPreview.addEventListener('click', closePopup);
formEdit.addEventListener('submit', handleSubmitEdit);
formAdd.addEventListener('submit', handleSubmitAdd);


render();

