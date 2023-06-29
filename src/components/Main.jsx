import React from "react"
import api from "../utils/api.js"
import Card from "./Card.jsx"

function Main({ 
  onEditProfile, // Слушатель открытия профиля
  onAddPlace, // Слушатель добавления карточки
  onEditAvatar, // Слушатель редактирования аватара
  onOpenImage, // Слушатель открытия картинки
  onDeleteConfirmation // Слушатель подтверждения удаления
  }) {

  const [userName, setUserName] = React.useState('') // Изменение профиля
  const [userDescription, setUserDescription] = React.useState('') // Добавление карточки
  const [userAvatar, setUserAvatar] = React.useState('') // Обновление аватара
  const [cards, setCards] = React.useState([]) // Загрузка карточек с сервера
  const [myId, setMyId] = React.useState('') // Запись АйДи юзера

  React.useEffect(() => {
    Promise.all([
      api.getCards(), // Запрашиваем массив карточек с сервера
      api.getUserInfo() // Запрашиваем данные юзера
    ])
    .then(([cardsData, user]) => {
      setMyId(user._id) // Записываем свой АйДи
      setUserName(user.name)
      setUserDescription(user.about)
      setUserAvatar(user.avatar)
      setCards(cardsData)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

  return (
    <main className="content App__content">
      <section className="profile">
        <div className="profile__item">

          <button className="profile__avatar-edit" 
          type="button" 
          aria-label="редактировать аватар"
          onClick={onEditAvatar}>
            <img className="profile__avatar" 
            src={userAvatar} 
            alt="Аватар профиля" />
          </button>
          
          <div className="profile__info">
            <div className="profile__name-item">
              <h1 className="profile__name">{userName}</h1>
              
              <button className="profile__edit" 
              type="button" 
              aria-label="редактировать профиль"
              onClick={onEditProfile} />
            </div>

            <p className="profile__caption">{userDescription}</p>
          </div>
        </div>

        <button className="profile__add-element" 
        type="button" 
        aria-label="добавить фотографию"
        onClick={onAddPlace}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((cardData) => {
            return (
              <Card 
              key={cardData._id}
              cardData={cardData}
              onOpenImage={onOpenImage}
              myId={myId}
              onDeleteConfirmation={onDeleteConfirmation} />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main