function ImagePopup({ 
    isOpen, // Слушатель открытия попапа
    onClose, // Слушатель закрытия попапа
    card, // Данные карточки
    onClickOverlay // Слушатель закрытия по оверлэю
    }) {

    return (
        <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} 
        onClick={onClickOverlay}>
            <div className="popup__image-box">
                <img 
                className="popup__image" 
                src={card.src || "#"} 
                alt={card.alt || " "} />
                <h2 className="popup__description">{card.alt || " "}</h2>
                
                <button className="popup__close" 
                type="button" 
                aria-label="Закрыть окно"
                onClick={onClose}>
                </button>
            </div>
        </div>
    )
}

export default PopupImage
