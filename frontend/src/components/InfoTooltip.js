import React from 'react';

// eslint-disable-next-line react/prop-types
export default function InfoTooltip({ onClose, isOk }) {
    return (
        <div className="popup popup-popup-registration popup_active">
            <div className="popup__container popup__container_registration">
                <button className="popup__button popup__button_close" type="button" aria-label="Закрыть форму" onClick={onClose} />
                <div className={`popup__register popup__register_type_${isOk ? 'ok' : 'error'}`}></div>
                <h3 className="popup__title_registration">
                    {isOk ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>
            </div>
        </div>
    );
}
