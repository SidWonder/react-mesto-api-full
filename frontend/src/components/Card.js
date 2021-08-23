import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

// eslint-disable-next-line react/prop-types
export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
	const currentUser = React.useContext(CurrentUserContext);
	// eslint-disable-next-line react/prop-types
	const {name,link,likes} = card;
	// eslint-disable-next-line react/prop-types
	const isOwn = card.owner._id === currentUser._id;
	const DeleteBtn = () => (
		<button type="button"
			className="place__button place__button_delete"
			aria-label="Удалить карточку"
			onClick={handleDeleteClick}
		></button>);
	// eslint-disable-next-line react/prop-types
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = `${isLiked ? 'place__button_like-active' : ''}`;
    
	function handleClick() {
		onCardClick(card);
	}
	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	return (
			<article className="place">
				<img src={link} alt={name} loading="lazy" className="place__img" onClick={handleClick}/>
				<div className="place__wrapper">
					<h3 className="place__title">{name}</h3>
					<button type="button"
						onClick={handleLikeClick}
						className={`place__button place__button_like ${cardLikeButtonClassName}`}
						aria-label="Лайкнуть эту шнягу"></button>
					{/* eslint-disable-next-line react/prop-types */}
					<span className="place__like-counter">{likes.length}</span>
				</div>
				{isOwn && <DeleteBtn/>}
			</article>
	);
}