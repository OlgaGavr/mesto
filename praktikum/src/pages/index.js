import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { configValidation, options } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import './index.css';
import { UserInfo } from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.button_action_edit');
const addButton = document.querySelector('.button_action_add');
const userNamePopup = editPopup.querySelector('.popup__field_text_name');
const userAboutPopup =  editPopup.querySelector('.popup__field_text_about');

const api = new Api(options);

const user = new UserInfo({selectorName: ".profile__name", selectorAbout: ".profile__about"});
api.getUser().then((result) => {
  user.setUserInfo(result.name, result.about)
});
 
const popupEdit = new PopupWithForm('.popup_type_edit',
  {handleSubmitForm: (userElement) => {
     api.changeUser(userElement).then((result) => {
       user.setUserInfo(result.name, result.about)
     })
  }
})
popupEdit.setEventListeners();

const cardImage = new PopupWithImage('.popup_type_preview');
cardImage.setEventListeners();

const cardList = new Section(
                       {items: [], 
                        renderer: (itemCard) =>{
                          cardList.addItem(createNewCard(itemCard))
                        }}, 
                        '.cards');

api.getCards().then((result) => cardList.renderItems(result));

const popupAdd = new PopupWithForm(
                       '.popup_type_add',
                       {handleSubmitForm: (newCard) => {
                         api.postCard(newCard)
                         .then((result) => {
                           console.log(result)
                            const cardList = new Section(
                              {items: result, 
                               renderer: (itemCard) =>{
                                 cardList.addItem(createNewCard(itemCard))
                               }
                              },
                              '.cards');
                              cardList.addItem(createNewCard(result))
                            })}})

function createNewCard(itemNewCard) {
  const card = new Card(itemNewCard, 
                        {handlPreviewCard: (cardName, cardLink) => {
                          cardImage.openPopup(cardName, cardLink)
                        }}, 
                        ".item-template");                                
  return card.createCard();
} 

popupAdd.setEventListeners();

addButton.addEventListener('click', () => {
  popupAdd.openPopup();
  
});

editButton.addEventListener('click', () => {
  const userProfil =  user.getUserInfo();
  userNamePopup.value = userProfil.name;
  userAboutPopup.value = userProfil.link;
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


