import React from "react"
import AppContext from "../contexts/AppContext.js"
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import usePopupClose from "../hooks/usePopupClose.js"
import useForm from "../hooks/useForm.js"
import PopupWithForm from "./PopupWithForm.jsx"
import Input from "./Input.jsx"

const EditProfilePopup = ({ isOpen, onSubmit }) => {
	const { closeAllPopups } = React.useContext(AppContext)
	const currentUser = React.useContext(CurrentUserContext)
	const {values, handleChange, setValues} = useForm({})

	// Вставляем данные профиля в инпуты
	React.useEffect(() => {
		setValues({ 
			name: currentUser?.name, 
			about: currentUser?.about
		})
	}, [currentUser, isOpen, setValues])

	usePopupClose(isOpen, closeAllPopups)

  return (
		<PopupWithForm 
		name={'profile'} 
		title={'Редактировать профиль'} 
		isOpen={isOpen} 
		onSubmit={(evt) => onSubmit(evt, values)}>

			<Input
				id={"profile-name"} 
				className={"popup__input popup__input_profile_name"} 
				type={"text"} 
				name={"name"} 
				placeholder={"Введите своё имя"} 
				minLength={"2"} 
				maxLength={"40"} 
				spanId={"error-profile-name"}
				value={values.name} 
				onChange={(evt) => handleChange(evt, 'name')} 
			/>

			<Input
				id={"profile-caption"} 
				className={"popup__input popup__input_profile_caption"} 
				type={"text"} 
				name={"about"} 
				placeholder={"Опишите себя"} 
				minLength={"2"} 
				maxLength={"200"} 
				spanId={"error-profile-caption"}
				value={values.about} 
				onChange={(evt) => handleChange(evt, 'about')} 
			/>
		</PopupWithForm>
	)
}

export default EditProfilePopup
