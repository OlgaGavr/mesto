import { Section } from './components/Section.js';
import { Card } from './components/Card.js';
import { initialCards, profileName, profileAbout, popupName, popupAbout, configValidation } from './utils/constants.js';
import { FormValidator } from './components/FormValidator.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import './pages/index.css';
import { UserInfo } from './components/UserInfo.js';

const editButton = document.querySelector('.button_action_edit');
const addButton = document.querySelector('.button_action_add');

const cardList = new Section({items: initialCards, 
                           renderer: (newCard) =>{
                            const card = new Card(newCard, 
                                                 {handlPreviewCard: (cardName, cardLink) => {
                                                  const cardImage = new PopupWithImage('.popup_type_preview', cardName, cardLink);
                                                  cardImage.openPopup();
                                                  cardImage.setEventListeners();
                                                 }}, 
                                                 ".item-template");                                
                            const cardElement = card.createCard();
                            cardList.addItem(cardElement);
                           }}, 
                           '.cards');
cardList.renderItems();

const popupAdd = new PopupWithForm('.popup_type_add',
                                    {handleSubmitForm: (newCard) => {
                                      const card = new Card(newCard, 
                                                           {handlPreviewCard: (cardName, cardLink) => {
                                                              const cardImage = new PopupWithImage('.popup_type_preview', cardName, cardLink);
                                                              cardImage.openPopup();
                                                              cardImage.setEventListeners()
                                                            }}, 
                                                            ".item-template");                                
                                      const cardElement = card.createCard();
                                      cardList.addItem(cardElement);
                                    }}) 
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm('.popup_type_edit',
                                     {handleSubmitForm: (editUser) => {
                                      const user = new UserInfo(editUser.name, editUser.link);
                                      user.setUserInfo(); 
                                    }})
popupEdit.setEventListeners();

addButton.addEventListener('click', () => {
  popupAdd.openPopup();
  
});

editButton.addEventListener('click', () => {
  const user = new UserInfo(profileName.textContent, profileAbout.textContent);
  const userProfil =  user.getUserInfo();
  popupName.value = userProfil.name;
  popupAbout.value = userProfil.link;
  popupEdit.openPopup();
});

function roundForm(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const formValidate = new FormValidator(config, formElement);
    formValidate.enableValidation();
  });
};

roundForm(configValidation);


