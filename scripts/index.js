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

function render(masCard){
  masCard.forEach((card) => {
      renderCard(createCard(card), cards)
  });
};

function createCard(card) {
  const cardElement = itemTemplate.cloneNode(true);
  cardElement.querySelector('.card__text').textContent = card.name;
  const cardElementImage = cardElement.querySelector('.card__image');
  cardElementImage.alt = card.name;
  cardElementImage.src = card.link;

  cardElement.querySelector('.button_action_like').addEventListener('click', likeCard);
  cardElement.querySelector('.button_action_delete').addEventListener('click', deleteCard);
  cardElementImage.addEventListener('click', previewCard);
  return cardElement;
}

function renderCard(newCard, wrap){
  wrap.prepend(newCard);
}

function likeCard(evt){
  evt.target.classList.toggle('button_action_like-active');
}

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

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function previewCard(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.closest('.card').querySelector('.card__text').textContent;
  popupImage.alt = evt.target.closest('.card').querySelector('.card__text').textContent;
  openPopup(popupPreview);
}

function handleSubmitEdit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileAbout.textContent =  popupAbout.value;
  closePopup(popupEdit);
}

function handleSubmitAdd (evt) {
  evt.preventDefault();
  const cardAdd = {
    name: popupNameAdd.value,
    link: popupLink.value
  }  
  renderCard(createCard(cardAdd), cards);
  closePopup(popupAdd);
}

function resetEditForm (paramForm) {
  paramForm.reset();
}

function openEditPopup(){
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

editButton.addEventListener('click', () => {
  buttonOff(formEdit, configValidation);
  openEditPopup();
  resetError(formEdit, configValidation);
  openPopup(popupEdit);
});
addButton.addEventListener('click', () => {
  buttonOff(formAdd, configValidation);
  openPopup(popupAdd);
  resetEditForm(formAdd);
  resetError(formAdd, configValidation);
});
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonPreview.addEventListener('click', () => closePopup(popupPreview));
formEdit.addEventListener('submit', handleSubmitEdit);
formAdd.addEventListener('submit', handleSubmitAdd);
popupEdit.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupEdit);
  }
});
popupAdd.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
   closePopup(popupAdd)
  }
});
popupPreview.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupPreview)
  }
});

render(initialCards);



