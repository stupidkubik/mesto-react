import React from "react";

const EditProfilePopup = ({ isOpen, onClose, onSubmit }) => {
	
	// Контролируемые инпуты 
	const [inputData, setInputData] = React.useState({name: '', about: ''})
	const handleInputChange = (evt, name) => { 
		setInputData({ ...inputData, [name]: evt.target.value })
	}

	const handleClickByOverlay = (evt) => { // Закрытие по оверлэю
		if(evt.target === evt.currentTarget) {
			onClose()
			setInputData({ name: '', about: '' })
		}
	}

	const handleClick = () => { // Закрытие по Esc
		onClose(); 
		setInputData({ name: '', about: '' })
	}

  return (
		<div className={`popup popup_type_profile} ${isOpen ? 'popup_opened' : ''}`}
		onClick={handleClickByOverlay}>
			<div className="popup__container">
				<h2 className="popup__title">Редактировать профиль</h2>

				<button className="popup__close"
				type="button" 
				aria-label="Закрыть окно"
				onClick={handleClick}>
				</button>

				<form 
				className="popup__form popup__form_profile"
				name="profile-form" 
				onSubmit={(evt) => {
					onSubmit(evt, inputData)
					setInputData({ name: '', about: '' })
				}}
				// noValidate
				>
					<input 
          id="profile-name" 
          className="popup__input popup__input_profile_name" 
          type="text" 
          name="title" 
					value={inputData.name} 
					onChange={(evt) => handleInputChange(evt, 'name')} 
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
					value={inputData.about} 
					onChange={(evt) => handleInputChange(evt, 'about')} 
          placeholder="Опишите себя" 
          minLength="2" 
          maxLength="200" 
          required />

          <span id="error-profile-caption" className="popup__error"></span>
					
					<button className="popup__submit" type="submit">Сохранить</button>
				</form>
			</div>
		</div>
	)
}

export default EditProfilePopup
