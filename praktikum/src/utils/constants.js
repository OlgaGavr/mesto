// export const initialCards = [
//     {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
//   ]; 

export const configValidation = {
    formSelector: '.form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.button_action_save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

export const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'a1c29a67-9f60-4b6b-b292-4f61a5453ed6',
    'Content-Type': 'application/json',
  }
} 