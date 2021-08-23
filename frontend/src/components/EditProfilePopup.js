import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

// eslint-disable-next-line react/prop-types
export default function EditProfilePopup({isOpen, closeIt, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('Жак Ив Кусто');
    const [description, setDescription] = React.useState('Классный чел');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm name='profile-edit'
                       title='Редактировать профиль'
                       buttonText='Сохранить'
                       isOpen={isOpen}
                       closeIt={closeIt}
                       onSubmit={handleSubmit.bind(this)}
        >
            <label className="form__label">
                <input className="form__input"
                       id="profile__header-change"
                       type="text"
                       name="profile-name"
                       placeholder="Имя"
                       minLength="2"
                       maxLength="40"
                       value={name || ''}
                       onChange={handleNameChange}
                       required
                />
                <span className="form__error" id="profile__header-change-error"></span>
            </label>
            <label className="form__label">
                <input className="form__input"
                       id="profile__subtitle-change"
                       type="text"
                       name="profile-job"
                       minLength="2"
                       maxLength="200"
                       required
                       value={description || ''}
                       onChange={handleDescriptionChange}
                       placeholder="Чем занят?"/>
                <span className="form__error" id="profile__subtitle-change-error"></span>
            </label>
        </PopupWithForm>);
}