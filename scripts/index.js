let openButton = document.querySelector('.button_action_edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');

let togglePopup = () => {
    popup.classList.toggle('popup_opened');
}

let formElement = document.querySelector('.form');
function openPopup() {
  formElement.querySelector('.popup__field_text_name').value = document.querySelector('.profile__name').textContent;
  formElement.querySelector('.popup__field_text_about').value = document.querySelector('.profile__about').textContent;
  togglePopup();
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', togglePopup);

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  let nameInput = formElement.querySelector('.popup__field_text_name');
  let jobInput =  formElement.querySelector('.popup__field_text_about');
  document.querySelector('.profile__name').textContent =  nameInput.value;
  document.querySelector('.profile__about').textContent =   jobInput.value;
  togglePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 

