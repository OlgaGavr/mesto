import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { initialCards, configValidation } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import './index.css';
import { UserInfo } from '../components/UserInfo.js';

//сonst popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.button_action_edit');
const addButton = document.querySelector('.button_action_add');

const cardImage = new PopupWithImage('.popup_type_preview');
cardImage.setEventListeners();

const cardList = new Section({items: initialCards, 
                           renderer: (newCard) =>{
                             const card = new Card(newCard, 
                                         {handlPreviewCard: (cardName, cardLink) => {
                                            cardImage.openPopup(cardName, cardLink)}}, 
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
                                               cardImage.openPopup(cardName, cardLink)
                                            }}, 
                                               ".item-template");                                
                                      const cardElement = card.createCard();
                                      cardList.addItem(cardElement);
                                    }}) 
popupAdd.setEventListeners();

const user = new UserInfo({selectorName: ".profile__name", selectorAbout: ".profile__about"});

const popupEdit = new PopupWithForm('.popup_type_edit',
                                     {handleSubmitForm: (userElement) => {
                                      user.setUserInfo(userElement.firstname, userElement.about)}})
popupEdit.setEventListeners();

addButton.addEventListener('click', () => {
  popupAdd.openPopup();
  
});

editButton.addEventListener('click', () => {
  const userProfil =  user.getUserInfo();
//  popupEdit.querySelector('.popup__field_text_name').value = userProfil.firstName;
 // popupEdit.querySelector('.popup__field_text_about').value = userProfil.about;
console.log(userProfil)
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


