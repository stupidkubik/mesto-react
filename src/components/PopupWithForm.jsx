import React from "react";

function PopupWithForm({ 
	name, // Название класса попапа
	title, // Заголовок попапа
	buttonTitle = 'Сохранить', // Название кнопки сабмита
	isOpen, // Слушатель открытия попапа
	onClose, // Слушатель закрытия попапа
	onSubmit,
	children // Инпуты попапа
	}) {

	const handleClickByOverlay = (evt) => { // Закрытие попапов по оверлэю
		if(evt.target === evt.currentTarget) {
			onClose();
		}
	}

	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
		onClick={handleClickByOverlay}>
			<div className="popup__container">
				<h2 className="popup__title">{title}</h2>

				<button className="popup__close"
				type="button" 
				aria-label="Закрыть окно"
				onClick={onClose}>
				</button>

				<form 
				className={`popup__form popup__form_${name}`} 
				name={`${name}-form`} 
				// noValidate
				>
					{children}
					
					<button className="popup__submit" 
					type="submit" 
					onSubmit={onSubmit}>
						{buttonTitle}
					</button>
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm