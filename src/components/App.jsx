import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

function App() {
  const [openPopupProfile, setOpenPopupProfile] = React.useState(false);
  const [openPopupAdd, setOpenPopupAdd] = React.useState(false);
  const [openPopupAvatar, setOpenPopupAvatar] = React.useState(false);
  const [openPopupDelete, setOpenPopupDelete] = React.useState(false);
  const [openPopupImage, setOpenPopupImage] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  function handleEditProfileClick() { // Открытие попапа обновления профиля
    setOpenPopupProfile(true)
  }
  function handleAddPlaceClick() { // Открытие попапа с добавлением карточки
    setOpenPopupAdd(true)
  }
  function handleEditAvatarClick() { // Открытие попапа обновления аватара
    setOpenPopupAvatar(true)
  }
  function handleDeleteClick() { // Открытие попапа с удалением
    setOpenPopupDelete(true)
  }
  function handleCardClick(evt) { // Открытие попапа с картинкой
    setSelectedCard({ name: evt.target.src, link: evt.target.alt})
    console.log(selectedCard)
    console.log(evt.target.src)
    setOpenPopupImage(true)
  }

  function closeAllPopups() { // Закрытие всех попапов по крестику
    setOpenPopupProfile(false)
    setOpenPopupAdd(false)
    setOpenPopupAvatar(false)
    setOpenPopupDelete(false)
    setOpenPopupImage(false)

    setSelectedCard({ name: '', link: '' })
  }

  return (
    <div className="App">
      <Header />
      
      <Main onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onEditAvatar={handleEditAvatarClick} 
      onOpenImage={handleCardClick} 
      onDeleteConfirmation={handleDeleteClick} />

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
      name="delete" 
      title="Вы уверены?" 
      buttonTitle="Да" />

      <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups} 
      isOpen={openPopupImage} />
    </div>
  );
}

export default App;
