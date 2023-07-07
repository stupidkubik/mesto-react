import React from "react";

const AddPlacePopup = ({ isOpen, onClose, onSubmit }) => {

	// Контролируемые инпуты 
	const [inputData, setInputData] = React.useState({ title: '', link: '' })
	function handleInputChange(evt, name) {
		setInputData({ ...inputData, [name]: evt.target.value })
	}

	const handleClickByOverlay = (evt) => { // Закрытие по оверлэю
		if(evt.target === evt.currentTarget) {
			onClose()
			setInputData({ title: '', link: '' })
		}
	}

	const handleClick = () => { // Закрытие по Esc
		onClose(); 
		setInputData({ title: '', link: '' })
	}

  return (
		<div className={`popup popup_type_add} ${isOpen ? 'popup_opened' : ''}`}
		onClick={handleClickByOverlay}>
			<div className="popup__container">
				<h2 className="popup__title">Новое место</h2>

				<button className="popup__close"
				type="button" 
				aria-label="Закрыть окно"
				onClick={handleClick}>
				</button>

				<form 
				className="popup__form popup__form_add"
				name="profile-form" 
				onSubmit={(evt) => {
					onSubmit(evt, inputData)
					setInputData({ title: '', link: '' })
				}}
				// noValidate
				>
					<input 
          id="card-name" 
          className="popup__input popup__input_card_name" 
          type="text" 
          name="title" 
          value={inputData.title} 
					onChange={(evt) => handleInputChange(evt, 'title')} 
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
          value={inputData.link} 
					onChange={(evt) => handleInputChange(evt, 'link')} 
          placeholder="Ссылка на картинку" 
          required />

          <span id="error-card-link" className="popup__error"></span>
					
					<button className="popup__submit" type="submit">Создать</button>
				</form>
			</div>
		</div>
	)
}

export default AddPlacePopup
