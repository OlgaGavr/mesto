export class Api {
    constructor(options) {
      this._url = options.url;
      this._authorization = options.headers.authorization;
    //  this.headers = options.headers['Content-Type'];
    }
  
    getUser() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
          if (res.ok) {
            return res.json()
          } 
          return Promise.reject(`Ошибка: ${res.status}`);
        })
      .catch(err => console.log(err));
    }

    getCards() {
       return fetch(`${this._url}/cards`, {
          headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
            if (res.ok) {
              return res.json()
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
          })
        .catch(err => console.log(err));
      }
  
      changeUser(user) {
          return fetch(`https://mesto.nomoreparties.co/v1/cohort-21/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: 'a1c29a67-9f60-4b6b-b292-4f61a5453ed6',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            about: user.about
          })
        })
        .then(res => {
          if (res.ok) {

            return res.json()
          } 
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => {
            console.log(err)
        }); 
      }

      
      postCard(newCard) {
        console.log("user: ",  newCard.name,)
        console.log('about:', newCard.link)
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
          })
        })
        .then(res => {
          console.log(res.ok, res)
          if (res.ok) {

            return res.json()
          } 
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => console.log(err)); 
      }

      deleteCard(delCardId) {
        console.log(delCardId)
        return fetch(`${this._url}/cards/${delCardId}`, {
          method: 'DELETE',
          headers: {
            authorization: this._authorization,
          },
        })
        .then(res => {
           if (res.ok) {
            return res.json()
          } 
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => console.log(err)); 
      }

      likeYes(id) {
        return fetch(`${this._url}/cards/likes/${id} `, {
          method: "PUT",
          headers: {
            authorization: this._authorization,
          },
        })
        .then(res => {
          if (res.ok) {
            return res.json()
          } 
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => console.log(err)); 
      }
      
      likeNo(id) {
        return fetch(`${this._url}/cards/likes/${id} `, {
          method: "DELETE",
          headers: {
            authorization: this._authorization,
          },
        })
        .then(res => {
          if (res.ok) {
            return res.json()
          } 
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => console.log(err)); 
      }

  }