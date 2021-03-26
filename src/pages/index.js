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
                          
api.getUser()
  .then((result) => {
                     user.setUserInfo(result.name, result.about);
                     user.setUserAvatar(result.avatar)
                     myId = result._id;
                    }
  );
 
const popupEdit = new PopupWithForm('.popup_type_edit',
  {handleSubmitForm: (userElement) => {
     editPopup.querySelector('.button_action_save').textContent = 'Сохранение...';
     api.changeUser(userElement)
       .then((result) => {
         user.setUserInfo(result.name, result.about)
       })
       .then(() => {popupEdit.closePopup()})
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

api.getCards().then((result) => {cardList.renderItems(result)});

const popupAdd = new PopupWithForm(
                       '.popup_type_add',
                       {handleSubmitForm: (newCard) => {
                         addPopup.querySelector('.button_action_save').textContent = 'Сохранение...';
                         api.postCard(newCard)
                          .then((result) => {
                            const cardList = new Section(
                              {items: result, 
                               renderer: (itemCard) =>{
                                 cardList.addItem(createNewCard(itemCard))
                               }
                              },
                              '.cards');
                              cardList.addItem(createNewCard(result))
                          })
                          .then(() => {popupAdd.closePopup()})
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
                         handleLikeClick: (isLike, cardLikes, element) => {
                            if (!isLike) {
                              api.likeYes(itemNewCard._id,)
                                .then((result) => {
                                  cardLikes.textContent = result.likes.length;
                                  element.querySelector('.button_action_like').classList.toggle('button_action_like-active');
                                  cardNew.cardLike = cardNew.isLike(Array.from(result.likes).map((item) => {return item._id}));
                                });
                            } else {
                              api.likeNo(itemNewCard._id,)
                                .then((result) => {
                                  cardLikes.textContent = result.likes.length; 
                                  element.querySelector('.button_action_like').classList.toggle('button_action_like-active');
                                  cardNew.cardLike = cardNew.isLike(Array.from(result.likes).map((item) => {return item._id}));
                                })
                            }
                         },
                         handleDeleteIconClick: (card) => {
                           popupSubmit.openPopup(card);
                           popupSubmit.setHandler((card) => {
                                                                 api.deleteCard(card.cardId)
                                                                 .then(() => {
                                                                   cardNew.deleteCard();
                              });
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

