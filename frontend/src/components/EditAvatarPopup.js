import React from 'react';
import PopupWithForm from './PopupWithForm';

// eslint-disable-next-line react/prop-types
export default function EditAvatarPopup ({isOpen, closeIt, onUpdateAvatar}) {

	const avatarRef = React.useRef(null);

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: avatarRef.current.value,
		});
		avatarRef.current.value = '';
	}

	return(
		<PopupWithForm name='popup-avatar'
			title='Обновить аватар'
			buttonText='Сохранить'
			isOpen={isOpen}
			closeIt={closeIt}
			onSubmit={handleSubmit}
		>
					<label className="form__label">
						<input className="form__input"
							type="url"
							id="avatar-url-change"
							name="avatar-url"
							placeholder="Ссылка на аватар"
							minLength="1"
							required
							ref={avatarRef}
						/>
						<span className="form__error" id="avatar-url-change-error"></span>
					</label>
			</PopupWithForm>);
}