import React from 'react';

// eslint-disable-next-line react/prop-types
export default function PopupWithForm({name, title, buttonText,isOpen, closeIt ,children, onSubmit}) {
	return(
		<div className={`popup popup-${name} ${isOpen ? 'popup_active' : ''}`}>
			<div className="popup__container">
				<h3 className="popup__title">{title}</h3>
				{/* eslint-disable-next-line react/prop-types */}
				<form className="form" name={name} noValidate onSubmit={onSubmit}>
					{children}
					<button
						type='submit'
						className="form__button"
					>{buttonText}
					</button>
				</form>
				<button
					type="button"
					className="popup__button popup__button_close"
					onClick={closeIt}
				></button>
			</div>
		</div>
	);
}