import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header page__header">
        <img className="header__logo" 
        src="./images/logo/logo-white.svg" 
        alt="Логотип" />
      </header>

      <main className="content page__content">

        <section className="profile">

          <div className="profile__item">

            <button className="profile__avatar-edit" 
            type="button" 
            aria-label="редактировать аватар">
              <img className="profile__avatar" 
              src="#" 
              alt="Аватар профиля" />
            </button>
              
            <div className="profile__info">
              <div className="profile__name-item">
                <h1 className="profile__name"></h1>
                
                <button className="profile__edit" 
                type="button" 
                aria-label="редактировать профиль">
                </button>
              </div>
              <p className="profile__caption"></p>
            </div>
          </div>

          <button className="profile__add-element" 
          type="button" 
          aria-label="добавить фотографию">
          </button>
        </section>

        <section className="elements">
          <ul className="elements__list">
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__caption">&#169; 2020 Mesto Russia</p>
      </footer>

      <div className="popup popup_type_profile">
        <div className="popup__container">
          <h2 className="popup__title">Редактировать профиль</h2>

          <button className="popup__close" 
          type="button" 
          aria-label="Закрыть окно">
          </button>

          <form className="popup__form popup__form_profile" name="profile-form" noValidate>
              
            <input 
            id="profile-name" 
            className="popup__input popup__input_profile_name" 
            type="text" 
            name="title" 
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
            placeholder="Опишите себя" 
            minLength="2" 
            maxLength="200" 
            required />

            <span id="error-profile-caption" className="popup__error"></span>

            <button className="popup__submit" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_add">
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>

          <button className="popup__close" 
          type="button" 
          aria-label="Закрыть окно">
          </button>

          <form className="popup__form popup__form_card" name="add-form" noValidate>
            
            <input 
            id="card-name" 
            className="popup__input popup__input_card_name" 
            type="text" 
            name="title" 
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
            placeholder="Ссылка на картинку" 
            required />

            <span id="error-card-link" className="popup__error"></span>

            <button className="popup__submit" type="submit">Создать</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_image">
        <div className="popup__image-box">
          <img className="popup__image" src="#" alt="" />
          <h2 className="popup__description"></h2>
          
          <button className="popup__close" 
          type="button" 
          aria-label="Закрыть окно">
          </button>
        </div>
      </div>

      <div className="popup popup_type_avatar">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>

          <button className="popup__close" 
          type="button" 
          aria-label="Закрыть окно">
          </button>

          <form className="popup__form popup__form_avatar" name="avatar-form" noValidate>
              
            <input 
            id="avatar-link" 
            className="popup__input popup__input_avatar-link" 
            type="url" 
            name="avatar" 
            placeholder="Ссылка на новый аватар" 
            required />

            <span id="error-avatar-link" className="popup__error"></span>

            <button className="popup__submit" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_delete">
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>

          <button className="popup__close" 
          type="button" 
          aria-label="Закрыть окно">
          </button>

          <form className="popup__form popup__form_delete" name="delete-form" noValidate>
            <button className="popup__submit" type="submit">Да</button>
          </form>
        </div> 
      </div>

      <template id="element">
        <li className="element">
          <img className="element__image" src="#" alt="" />

          <div className="element__name">
            <h2 className="element__title"></h2>
            
            <div className="element__like-box">
              <button className="element__like-icon" 
              type="button" 
              aria-label="поставить лайк">
              </button>

              <div className="element__like-count">0</div>
            </div>
          </div>
          
          <button className="element__trash-icon" 
          type="button" 
          aria-label="удалить карточку">
          </button>
        </li>
      </template>
    </div>
  );
}

export default App;
