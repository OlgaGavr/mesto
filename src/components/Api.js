export class Api {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.headers.authorization;
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
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
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
      if (res.ok) {
        return res.json()
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => console.log(err)); 
  }

  deleteCard(delCardId) {
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
      
  changeAvatar(user) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: user.avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {console.log(err)}); 
  }
}