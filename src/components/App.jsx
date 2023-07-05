import React from "react"
import Header from "./Header.jsx"
import Main from "./Main.jsx"
import Footer from "./Footer.jsx"
import PopupWithForm from "./PopupWithForm.jsx"
import ImagePopup from "./ImagePopup.jsx"
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import api from "../utils/api.js"

function App() {
  const [openPopupProfile, setOpenPopupProfile] = React.useState(false)
  const [openPopupAdd, setOpenPopupAdd] = React.useState(false)
  const [openPopupAvatar, setOpenPopupAvatar] = React.useState(false)
  const [openPopupDelete, setOpenPopupDelete] = React.useState(false)
  const [openPopupImage, setOpenPopupImage] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })

  const [currentUser, setCurrentUser] = React.useState({}) // Загрузка данных текущего юзера
  const [cards, setCards] = React.useState([]) // Загрузка карточек с сервера

  React.useEffect(() => {
    Promise.all([
      api.getCards(), // Запрашиваем массив карточек с сервера
      api.getUserInfo() // Запрашиваем данные юзера
    ])
    .then(([cardsData, user]) => {
      setCurrentUser(user)
      setCards(cardsData)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

// Функции попапов

  function handleEditProfileClick() { // Открытие попапа обновления профиля
    setOpenPopupProfile(true)
  }
  function handleAddPlaceClick() { // Открытие попапа с добавлением карточки
    setOpenPopupAdd(true)
  }
  function handleEditAvatarClick() { // Открытие попапа обновления аватара
    setOpenPopupAvatar(true)
  }
  function handleDeleteClick(evt) { // Открытие попапа с удалением
    setOpenPopupDelete(true)
    console.log(evt.target)
  }
  function handleCardDelete(evt) { // Обработчик удаления карточки
    evt.preventDefault()
    api.deleteCard(evt.target._id)
    .then((cardsData) => {
      setCards(() => cardsData.filter((c) => c._id !== evt.target._id)) // ??
    })
    .catch((err) => {
      console.error(err);
    })
  }
  function handleCardClick(evt) { // Открытие попапа с картинкой
    setSelectedCard({ link: evt.target.src, name: evt.target.alt})
    setOpenPopupImage(true)
  }
  function handleCardLike(card) { // Обработчик лайков
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.error(err)
    })
  }

  function closeAllPopups() { // Закрытие всех попапов по крестику
    setOpenPopupProfile(false)
    setOpenPopupAdd(false)
    setOpenPopupAvatar(false)
    setOpenPopupDelete(false)
    setOpenPopupImage(false)

    setSelectedCard({ name: '', link: '' })
  }

  const isOpen = openPopupProfile 
  || openPopupAdd 
  || openPopupAvatar 
  || openPopupImage

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape)
      return () => {
        document.removeEventListener('keydown', closeByEscape)
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        
        <Main cards={cards} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onOpenImage={handleCardClick} 
        onDeleteConfirmation={handleDeleteClick} 
        handleCardLike={handleCardLike} />

        <Footer />

        <PopupWithForm 
        onClose={closeAllPopups} 
        isOpen={openPopupProfile} 
        name="profile" 
        title="Редактировать профиль">
          <input 
          id="profile-name" 
          className="popup__input popup__input_profile_name" 
          type="text" 
          name="title" 
          placeholder="Введите своё имя" 
          minLength="2" 
          maxLength="40" 
          required />

          <span id="error-profile-name" className="popup__error"></span>

          <input 
          id="profile-caption" 
          className="popup__input popup__input_profile_caption" 
          type="text" 
          name="caption" 
          placeholder="Опишите себя" 
          minLength="2" 
          maxLength="200" 
          required />

          <span id="error-profile-caption" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm 
        onClose={closeAllPopups} 
        isOpen={openPopupAdd} 
        name="add" 
        title="Новое место" 
        buttonTitle="Создать">
          <input 
          id="card-name" 
          className="popup__input popup__input_card_name" 
          type="text" 
          name="title" 
          placeholder="Название" 
          minLength="2" 
          maxLength="30" 
          required />

          <span id="error-card-name" className="popup__error"></span>

          <input 
          id="card-link" 
          className="popup__input popup__input_card_link" 
          type="url" 
          name="link" 
          placeholder="Ссылка на картинку" 
          required />

          <span id="error-card-link" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm 
        onClose={closeAllPopups} 
        isOpen={openPopupAvatar} 
        name="avatar" 
        title="Обновить аватар">
          <input 
          id="avatar-link" 
          className="popup__input popup__input_avatar-link" 
          type="url" 
          name="avatar" 
          placeholder="Ссылка на новый аватар" 
          required />

          <span id="error-avatar-link" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm 
        onClose={closeAllPopups} 
        isOpen={openPopupDelete} 
        onSubmit={handleCardDelete}
        name="delete" 
        title="Вы уверены?" 
        buttonTitle="Да" />

        <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} 
        isOpen={openPopupImage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
