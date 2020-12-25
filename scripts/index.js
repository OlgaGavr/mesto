let openButton = document.querySelector('.button_action_edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.button_action_close');
let formElement = document.querySelector('.form');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let togglePopup = () => {
    popup.classList.toggle('popup_opened');
}

function openPopup() {
  formElement.querySelector('.popup__field_text_name').value = profileName.textContent;
  formElement.querySelector('.popup__field_text_about').value = profileAbout.textContent;
  togglePopup();
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  let nameInput = formElement.querySelector('.popup__field_text_name');
  let jobInput =  formElement.querySelector('.popup__field_text_about');
  profileName.textContent =  nameInput.value;
  profileAbout.textContent =   jobInput.value;
  togglePopup();
}
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit); 

