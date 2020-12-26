let openButton = document.querySelector('.button_action_edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.button_action_close');
let formElement = popup.querySelector('.form');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupName = formElement.querySelector('.popup__field_text_name');
let popupAbout = formElement.querySelector('.popup__field_text_about');

let togglePopup = () => {
    popup.classList.toggle('popup_opened');
}  


function openPopup() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  togglePopup();
  
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileAbout.textContent =  popupAbout.value;
  togglePopup();
}
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit); 

