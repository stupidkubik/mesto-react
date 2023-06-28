function PopupWithForm({ name, title, buttonTitle = 'Сохранить', isOpen, onClose, children }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
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
                noValidate>
                    {children}
                    <button className="popup__submit" type="submit">{buttonTitle}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm