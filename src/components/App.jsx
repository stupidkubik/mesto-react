import React from "react"
import Header from "./Header.jsx"
import Main from "./Main.jsx"
import Footer from "./Footer.jsx"
import PopupWithForm from "./PopupWithForm.jsx"
import ImagePopup from "./ImagePopup.jsx"
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import api from "../utils/api.js"
import EditProfilePopup from "../components/EditProfilePopup.jsx"
import AddPlacePopup from "../components/AddPlacePopup.jsx"
import EditAvatarPopup from "../components/EditAvatarPopup.jsx"

function App() {
  const [openPopupProfile, setOpenPopupProfile] = React.useState(false)
  const [openPopupAdd, setOpenPopupAdd] = React.useState(false)
  const [openPopupAvatar, setOpenPopupAvatar] = React.useState(false)
  const [openPopupDelete, setOpenPopupDelete] = React.useState(false)
  const [openPopupImage, setOpenPopupImage] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [deletedCardId, setDeletedCardId] = React.useState('')

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

  // Логика попапа обновления профиля
  function handleEditProfileClick() {
    setOpenPopupProfile(true)
  }

  function handleEditProfileSubmit(evt, inputData) {
    evt.preventDefault()
    api.updateProfile(inputData)
    .then((newProfiledata => {
      setCurrentUser(newProfiledata)
      closeAllPopups()
    }))
    .catch((err) => {
      console.error(err);
    })
	}

  // Логика попапа добавления карточки
  function handleAddPlaceClick() {
    setOpenPopupAdd(true)
  }

  function handleAddPlaceSubmit(evt, inputData) {
    evt.preventDefault()
    api.postCard(inputData)
    .then((newCard => {
      setCards([newCard, ...cards])
    })).catch((err) => {
      console.error(err);
    }).finally(closeAllPopups())
  }

  // Логика попапа обновления аватара
  function handleEditAvatarClick() {
    setOpenPopupAvatar(true)
  }

  function handleAvatarSubmit(evt, link) {
    evt.preventDefault()
    api.updateAvatar(link)
    .then((userInfo) => {
      setCurrentUser(userInfo)
    }).catch((err) => {
      console.error(err);
    }).finally(closeAllPopups())
  }

  // Логика попапа удаления карточки
  function handleCardDelete(cardData, evt) {
    if(openPopupDelete) { // Если попап уже открыт
      evt.preventDefault()
      api.deleteCard(deletedCardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== deletedCardId))
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        closeAllPopups()
        setDeletedCardId('')
      })
    } else { // Открываем попап
      setOpenPopupDelete(true)
      setDeletedCardId(cardData._id)
    }
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
    setDeletedCardId('')
  }

  const isOpen = openPopupProfile 
  || openPopupAdd 
  || openPopupAvatar 
  || openPopupImage

  React.useEffect(() => { // Закрытие попапов по Esc
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
        onDelete={handleCardDelete} 
        handleCardLike={handleCardLike} />

        <Footer />

        <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={openPopupProfile}
        onSubmit={handleEditProfileSubmit} />

        <AddPlacePopup 
        onClose={closeAllPopups} 
        isOpen={openPopupAdd}
        onSubmit={handleAddPlaceSubmit} />

        <EditAvatarPopup 
        onClose={closeAllPopups} 
        isOpen={openPopupAvatar} 
        onSubmit={handleAvatarSubmit} />

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
  )
}

export default App
