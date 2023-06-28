function PopupImage({ isOpen, onClose, card, onClickOverlay }) {

    return (
        <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} 
        onClick={onClickOverlay}
        // onKeyDownCapture={(evt) => {
        //     console.log(evt)
        //     onClickOverlay(evt)
        // }}
        >
            <div className="popup__image-box">
                <img className="popup__image" src={card.src || "#"} alt={card.alt || " "} />
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
