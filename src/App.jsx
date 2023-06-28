import React from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import PopupWithForm from "./components/PopupWithForm.jsx";
import ImagePopup from "./components/ImagePopup.jsx";

function App() {
  const [openPopupProfile, setOpenPopupProfile] = React.useState(false);
  const [openPopupAdd, setOpenPopupAdd] = React.useState(false);
  const [openPopupAvatar, setOpenPopupAvatar] = React.useState(false);
  const [openPopupDelete, setOpenPopupDelete] = React.useState(false);
  const [openPopupImage, setOpenPopupImage] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState('');

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
    setSelectedCard(evt.target)
    setOpenPopupImage(true)
  }

  function closeAllPopups() { // Закрытие всех попапов по крестику
    setOpenPopupProfile(false)
    setOpenPopupAdd(false)
    setOpenPopupAvatar(false)
    setOpenPopupDelete(false)
    setOpenPopupImage(false)

    setSelectedCard('')
  }
  
  const handleClickByOverlay = (evt) => { // Закрытие попапов по оверлэю
    // console.log(evt)
    // if(evt.key === 'Escape') {
    //   closeAllPopups();
    // }

    if(evt.target === evt.currentTarget) {
      closeAllPopups();
    }
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
      onClickOverlay={handleClickByOverlay} 
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
      onClickOverlay={handleClickByOverlay} 
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
      onClickOverlay={handleClickByOverlay} 
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
      onClickOverlay={handleClickByOverlay} 
      isOpen={openPopupDelete} 
      name="delete" 
      title="Вы уверены?" 
      buttonTitle="Да" />

      <ImagePopup 
      onClickOverlay={handleClickByOverlay} 
      card={selectedCard} 
      onClose={closeAllPopups} 
      isOpen={openPopupImage} />
    </div>
  );
}

export default App;
