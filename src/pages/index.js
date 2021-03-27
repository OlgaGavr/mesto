import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { configValidation, options } from '../utils/constants.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import './index.css';
import { UserInfo } from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

const addPopup = document.querySelector('.popup_type_add');
const editPopup = document.querySelector('.popup_type_edit');
const editPopupAvatar = document.querySelector('.popup_type_edit-avatar');
const editButton = document.querySelector('.button_action_edit');
const editAvatar = document.querySelector('.profile__avatar')
const addButton = document.querySelector('.button_action_add');
const userNamePopup = editPopup.querySelector('.popup__field_text_name');
const userAboutPopup =  editPopup.querySelector('.popup__field_text_about');
let myId = '';

const api = new Api(options);

const user = new UserInfo({
                           selectorName: ".profile__name", 
                           selectorAbout: ".profile__about",
                           selectorAvatar: ".profile__avatar" 
                          });

api.getAllData()
  .then((result) => {
    const [resultUser, resultCard] = result;
    user.setUserInfo(resultUser.name, resultUser.about);
    user.setUserAvatar(resultUser.avatar)
    myId = resultUser._id;

    cardList.renderItems(resultCard);
  })
  .catch(err => console.log(err));

const popupEdit = new PopupWithForm('.popup_type_edit',
  {handleSubmitForm: (userElement) => {
     editPopup.querySelector('.button_action_save').textContent = 'Сохранение...';
     api.changeUser(userElement)
       .then((result) => {
         user.setUserInfo(result.name, result.about)
       })
       .then(() => {popupEdit.closePopup()})
       .catch(err => console.log(err));
  }
})
popupEdit.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar',
  {handleSubmitForm: (userElement) => {
    editPopupAvatar.querySelector('.button_action_save').textContent = 'Сохранение...';
     api.changeAvatar(userElement)
       .then((result) => {
         user.setUserAvatar(result.avatar)
       })
       .then(() => {popupEditAvatar.closePopup()})
       .catch(err => console.log(err));
  }
})
popupEditAvatar.setEventListeners();

const cardImage = new PopupWithImage('.popup_type_preview');
cardImage.setEventListeners();

const cardList = new Section(
                       {items: [], 
                        renderer: (itemCard) =>{
                          cardList.addItem(createNewCard(itemCard))
                        }}, 
                        '.cards');

const popupAdd = new PopupWithForm(
                       '.popup_type_add',
                       {handleSubmitForm: (newCard) => {
                         addPopup.querySelector('.button_action_save').textContent = 'Сохранение...';
                         api.postCard(newCard)
                          .then((result) => {
                            cardList.addItem(createNewCard(result))
                          })
                          .then(() => {popupAdd.closePopup()})
                          .catch(err => console.log(err));
                        }})

 const popupSubmit = new PopupWithSubmit('.popup_type_delete');
 popupSubmit.setEventListeners();

function createNewCard(itemNewCard) {
  const cardNew = new Card(myId, {card: {
                           name: itemNewCard.name,
                           link: itemNewCard.link,
                           likes: itemNewCard.likes,
                           cardId: itemNewCard._id,
                           owner: itemNewCard.owner._id,
                           cardLike: 'false'
                         }, 
                         handlPreviewCard: (cardName, cardLink) => {
                           cardImage.openPopup(cardName, cardLink)
                         },
                         handleLikeClick: (cardLikeParam) => {
                            if (!cardLikeParam) {
                              api.likeYes(itemNewCard._id,)
                                .then((result) => {
                                  cardNew.updateLikes(Array.from(result.likes).map((item) => {return item._id}))
                                })
                                .catch(err => console.log(err));
                            } else {
                              api.likeNo(itemNewCard._id,)
                                .then((result) => {
                                  cardNew.updateLikes(Array.from(result.likes).map((item) => {return item._id}))
                                })
                                .catch(err => console.log(err));
                            }
                         },
                         handleDeleteIconClick: (card) => {
                           popupSubmit.openPopup(card);
                           popupSubmit.setHandler((card) => {
                                                                 api.deleteCard(card.cardId)
                                                                 .then(() => {cardNew.deleteCard()})
                                                                 .catch(err => console.log(err));
                          })
                           
                         }}, 
                         ".item-template");                                
  return cardNew.createCard(myId);
} 
popupAdd.setEventListeners();


addButton.addEventListener('click', () => {popupAdd.openPopup()});

editButton.addEventListener('click', () => {
  const userProfil =  user.getUserInfo();
  userNamePopup.value = userProfil.name;
  userAboutPopup.value = userProfil.link;
  popupEdit.openPopup();
});

editAvatar.addEventListener('click', () => {popupEditAvatar.openPopup()});

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

