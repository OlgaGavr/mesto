import { Card } from './Card.js';
import { initialCards } from './initial-сards.js';
import { FormValidator } from './FormValidator.js'

const configValidation = {
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.button_action_save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

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

const cards = document.querySelector('.cards');

function render(masCard){
  masCard.forEach((item) => {
    renderCard(item, cards);
  });
};

function renderCard(newCard, wrap){
  const card = new Card(newCard, ".item-template", handlPreviewCard);
  const cardElement = card.createCard();
  wrap.prepend(cardElement);
}

function handlPreviewCard(name, link) {
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = name;
  openPopup(popupPreview);
}

function handleSubmitAdd (evt) {
  evt.preventDefault();
  const cardAdd = {
    name: popupNameAdd.value,
    link: popupLink.value
  }  
  renderCard(cardAdd, cards);
  closePopup(popupAdd);
}

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  resetEditForm(formAdd);
 
});

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopup(popupParam) {
   popupParam.classList.remove('popup_opened');
   document.removeEventListener('keydown', closePopupEsc);
}

function openPopup(popupParam) {
  popupParam.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function handleSubmitEdit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileAbout.textContent =  popupAbout.value;
  closePopup(popupEdit);
}

function resetEditForm (paramForm) {
  paramForm.reset();
}

function openEditPopup(){
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

function closePopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

const roundForm = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const formValidate = new FormValidator(config, formElement);
    formValidate.enableValidation();
  });
  
};

editButton.addEventListener('click', () => {
  openEditPopup();
  openPopup(popupEdit);
});



closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonPreview.addEventListener('click', () => closePopup(popupPreview));
formEdit.addEventListener('submit', handleSubmitEdit);
formAdd.addEventListener('submit', handleSubmitAdd);
popupEdit.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);
popupPreview.addEventListener('click', closePopupByClickOnOverlay);

render(initialCards);
roundForm(configValidation);


