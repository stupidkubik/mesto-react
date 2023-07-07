import React from "react"
import usePopupClose from "../hooks/usePopupClose.js"

function ImagePopup({ 
  isOpen, // Слушатель открытия попапа
  onClose, // Слушатель закрытия попапа
  card // Объект с данными карточки
  }) {

  usePopupClose(isOpen, onClose)

  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-box">
        <img 
        className="popup__image" 
        src={card.link || "#"} 
        alt={card.name || " "} />
        
        <h2 className="popup__description">{card.name || " "}</h2>
        
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
