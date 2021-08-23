import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import Card from './Card';


// eslint-disable-next-line react/prop-types
export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, handleCardLike, handleCardDelete, onCardDelete, onCardLike, cards}) {
	const currentUser = React.useContext(CurrentUserContext);
	const {about, name, avatar} = currentUser;
	return (
			<main className="content">
				<section className="profile">
					<div onClick={onEditAvatar} className="profile__avatar-wrapper">
						<img className="profile__avatar"
							src={avatar}
							// style={{ backgroundImage: `url(${defaultAvatar})` }}
							alt="Аватар пользователя"/>
					</div>

					<div className="profile__wrapper">
						<h1 className="profile__header">{name}</h1>
						<button className="profile__button profile__button_edit"
							type="button"
							aria-label="Редактировать профиль"
							onClick={onEditProfile}
						>
						</button>
						<p className="profile__subtitle">{about}</p>
					</div>
					<button className="profile__button profile__button_add"
						type="button"
						aria-label="Добавить что-то новенькое"
						onClick={onAddPlace}
					>
					</button>
				</section>
				<section className="places">
					{/* eslint-disable-next-line react/prop-types */}
					{cards.map((card) =>(
						<Card key={card._id}
							  card={card}
							  onCardLike={onCardLike}
							  onCardDelete={onCardDelete}
							  onCardClick={onCardClick}/>
						)
					)}
				</section>
			</main>
	);
}