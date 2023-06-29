function Card({ 
  cardData, // Данные карточки
  onOpenImage, // Стейт открытия картинки 
  myId, // АйДи юзера
  onDeleteConfirmation // Стейт подтвержедния удаления карточки
  }) {

  function isOwner() {
    return myId === cardData.owner._id // Проверяем АйДи карточки
  }

  return (
    <li className="element">
      <img className="element__image" 
      src={cardData.link} 
      alt={cardData.name} 
      onClick={onOpenImage} />

      <div className="element__name">
        <h2 className="element__title">{cardData.name}</h2>
  
        <div className="element__like-box">
          <button className="element__like-icon" 
          type="button" 
          aria-label="поставить лайк">
          </button>

          <div className="element__like-count">{cardData.likes.length}</div>
        </div>
      </div>

      {
        isOwner() && <button className="element__trash-icon" 
        type="button" 
        aria-label="удалить карточку"
        onClick={onDeleteConfirmation}>
        </button>                    
      }
    </li>
  )
}

export default Card
