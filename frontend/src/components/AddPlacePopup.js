import React from 'react';
import PopupWithForm from './PopupWithForm';

// eslint-disable-next-line react/prop-types
export default function AddPlacePopup({isOpen, closeIt, onUpdatePlace}) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [isOpen])

    function handlePlaceNameChange(e) {
        setPlaceName(e.target.value);
    }

    function handlePlaceLinkChange(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdatePlace({
            name: placeName,
            link: placeLink,
        });
    }

    return (
    	<PopupWithForm name='popup-place'
                           title='Новое место'
                           buttonText='Создать'
                           isOpen={isOpen}
                           closeIt={closeIt}
                            onSubmit={handleSubmit.bind(this)}>
        <label className="form__label">
            <input id="place-title-change"
                   className="form__input"
                   type="text"
                   name="place-title"
                   placeholder="Название"
                   minLength="1"
                   maxLength="30"
                   value={placeName}
                   onChange={handlePlaceNameChange}
                   required/>
            <span className="form__error" id="place-title-change-error"></span>
        </label>
        <label className="form__label">
            <input className="form__input"
                   type="url"
                   id="place-url-change"
                   name="place-url"
                   placeholder="Ссылка на картинку"
                   minLength="1"
                   value={placeLink}
                   onChange={handlePlaceLinkChange}
                   required
            />
            <span className="form__error" id="place-url-change-error"></span>
        </label>
        </PopupWithForm>)};