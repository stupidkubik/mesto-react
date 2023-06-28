import React from "react"
import api from "../utils/api.js"
import Card from "./Card.jsx"

function Main({ onEditProfile, onAddPlace, onEditAvatar, onOpenImage, onDeleteConfirmation }) {

    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])
    const [myId, setMyId] = React.useState('')

    React.useEffect(() => {
        Promise.all([
            api.getCards(), // Запрашиваем массив карточек с сервера
            api.getId() // Запрашиваем данные юзера
        ])
        .then(([cardsData, user]) => {
            setMyId(user._id) // наполняем объект свойствами
            setUserName(user.name)
            setUserDescription(user.about)
            setUserAvatar(user.avatar)
            setCards(cardsData)
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