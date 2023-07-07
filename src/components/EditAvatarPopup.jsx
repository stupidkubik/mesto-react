import React from "react"

const EditAvatarPopup = ({ isOpen, onClose, onSubmit }) => {

  const inputData = React.useRef('');

	const handleClickByOverlay = (evt) => { // Закрытие по оверлэю
		if(evt.target === evt.currentTarget) {
			onClose()
      inputData.current.value = ''
		}
	}

	const handleClick = () => { // Закрытие по Esc
		onClose(); 
    inputData.current.value = ''
	}

  return (
		<div className={`popup popup_type_avatar} ${isOpen ? 'popup_opened' : ''}`}
		onClick={handleClickByOverlay}>
			<div className="popup__container">
				<h2 className="popup__title">Обновить аватар</h2>

				<button className="popup__close"
				type="button" 
				aria-label="Закрыть окно"
				onClick={handleClick}>
				</button>

				<form 
				className="popup__form popup__form_avatar"
				name="profile-form" 
				onSubmit={(evt) => {
					onSubmit(evt, inputData.current.value)
          inputData.current.value = ''
        }}
				// noValidate
				>
					<input 
          id="avatar-link" 
          className="popup__input popup__input_avatar-link" 
          type="url" 
          name="avatar" 
          placeholder="Ссылка на новый аватар" 
          ref={inputData} 
          required />

          <span id="error-avatar-link" className="popup__error"></span>
					
					<button className="popup__submit" type="submit">Сохранить</button>
				</form>
			</div>
		</div>
	)

}

export default EditAvatarPopup
