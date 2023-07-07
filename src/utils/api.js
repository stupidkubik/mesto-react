class Api {
  constructor( { baseUrl, headers } ) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }

  async getUserInfo() {
    const idData = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    return this._checkResponse(idData)
  }

  async getCards() {
    const cardsData = await fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    return this._checkResponse(cardsData)
  }    

  async postCard({ title, link }) {
    const newCardData = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link
        })
    })
    return this._checkResponse(newCardData)
  } 

  async updateProfile({ name, about }) {
    const newProfileData = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }) 
    return this._checkResponse(newProfileData)
  }

  async updateAvatar(avatar) {
    const newAvatar = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    return this._checkResponse(newAvatar)
  }

  async changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      const deleteLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      return this._checkResponse(deleteLike)
    } else {
      const putLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      return this._checkResponse(putLike)
    }
  }

  async deleteCard(cardId) {
    const cardDelete = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
    });
    return this._checkResponse(cardDelete)
  }
}

const api = new Api( {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63',
    'Content-Type': 'application/json' 
  }
})

export default api
