import React from "react"
import AppContext from "../contexts/AppContext.js"
import usePopupClose from "../hooks/usePopupClose.js"
import useForm from "../hooks/useForm.js"
import PopupWithForm from "./PopupWithForm.jsx"
import Input from "./Input.jsx"

const AddPlacePopup = ({ isOpen, onSubmit }) => {
	const { closeAllPopups } = React.useContext(AppContext)
	const {values, handleChange, setValues} = useForm({ title: '', link: '' })

	usePopupClose(isOpen, closeAllPopups)

	React.useEffect(() => {
		setValues({ title: '', link: '' })
	}, [isOpen, setValues]);

  return (
		<PopupWithForm 
		name={'add'} 
		title={'Новое место'} 
		buttonTitle={'Создать'} 
		isOpen={isOpen} 
		onSubmit={(evt) => onSubmit(evt, values)}>

			<Input
			id={"card-name"} 
			className={"popup__input popup__input_card_name"} 
			type={"text"} 
			name={"title"} 
			placeholder={"Название"} 
			minLength={"2"} 
			maxLength={"30"} 
			spanId={"error-card-name"}
			value={values.title} 
			onChange={(evt) => handleChange(evt, 'title')} 
			/>

			<Input
			id={"card-link"} 
			className={"popup__input popup__input_card_link"} 
			type={"url"} 
			name={"link"} 
			placeholder={"Ссылка на картинку"} 
			spanId={"error-card-link"}
			value={values.link} 
			onChange={(evt) => handleChange(evt, 'link')} 
			/>
		</PopupWithForm>
	)
}

export default AddPlacePopup
