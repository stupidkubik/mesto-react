import React from "react";

function ImagePopup({ 
  isOpen, // Слушатель открытия попапа
  onClose, // Слушатель закрытия попапа
  card // Объект с данными карточки
  }) {

  React.useEffect(() => { // Закрытие попапов на эскейп
    const handleClickByEsc = (evt) => {
      if(evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleClickByEsc)

    return () => {
      document.removeEventListener('keydown', handleClickByEsc)
    }
  }, [onClose])

  const handleClickByOverlay = (evt) => { // Закрытие попапов по оверлэю
    if(evt.target === evt.currentTarget) {
        onClose();
    }
  }

  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} 
    onClick={handleClickByOverlay}>
      <div className="popup__image-box">
        <img 
        className="popup__image" 
        src={card.name || "#"} 
        alt={card.link || " "} />
        
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

export default ImagePopup
