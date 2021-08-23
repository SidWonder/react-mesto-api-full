import React from 'react';
import { Route, Switch, Redirect, BrowserRouter, useHistory} from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

	const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
	const [isEditProfilePopupOpen, setIsPopupProfileState] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});

	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);

	const [isLoggedIn, setIsLogged] = React.useState(false);
	const [userInfo, setUserInfo] = React.useState({});
	const [registerIsOk, setRegisterIsOk] = React.useState(false);
	const [showInfoTooltip, setShowInfoTooltip] = React.useState(false);

	const history = useHistory();

	React.useEffect(() => {
		async function fetchData() {
			const userInfo = await api.getUserInfo();
			return userInfo;
		}
		fetchData()
			.then(data=> setCurrentUser(data))
			.catch(err => console.log(err));
	}, []);

	React.useEffect(() => {
		async function fetchData() {
			const cardsData = await api.getCards();
			return cardsData;
		}
		fetchData()
			.then(data=> setCards(data))
			.catch(err => console.log(err));
	}, []);

	function tokenCheck() {
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}
		auth.getUserData(token)
			.then((res) => {
				if (res.status === 401) {
					throw new Error('Токен не передан или передан не в том формате');
				} else if (res.status === 400) {
					throw new Error('Переданный токен некорректен');
				} else {
					return res.json();
				}
			})
			.then((res) => {
				const data = res.data ? res.data : {};
				setIsLogged(true);
				setUserInfo(data);
			})
			.catch((err) => console.log(err));
	}

	React.useEffect(() => {
		tokenCheck();
		if (isLoggedIn) {
			history.push('/');
		}
	}, [isLoggedIn]);

	function handleEditAvatarClick() {
		setIsAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsPopupProfileState(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleCardClick(card) {
		setIsImagePopupOpen(true);
		setSelectedCard(card);
	}

	function handleCloseAll() {
		setIsPopupProfileState(false);
		setIsAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsImagePopupOpen(false);
		setSelectedCard({});
	}

	function handleUpdateUser(userData) {
		api.setUserInfo(userData).then((data) => {
			setCurrentUser(data);
			handleCloseAll();
		}).catch((err) => { console.log(err); });
	}

	function handleUpdateAvatar(userData) {
		api.setUserAvatar(userData).then((data) => {
			setCurrentUser(data);
			handleCloseAll();
		}).catch((err) => { console.log(err); });
	}


	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		if (!isLiked) {
			api.addLike(card).then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			}).catch((err) => { console.log(err); });
		} else {
			api.deleteLike(card).then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			}).catch((err) => { console.log(err); });
		}
	}

	function handleCardDelete(card) {
		api.deleteCard(card).then(() => {
			setCards(cards.filter((item) => item._id !== card._id));
		}).catch((err) => { console.log(err); });
	}

	function handleAddPlace(placeData) {
		api.addNewCard(placeData).then((data) => {
			setCards([data, ...cards]);
			handleCloseAll();
		}).catch((err) => { console.log(err); });
	}

	function handleRegister(email, password) {
		auth.register(email, password)
			.then((res) => {
				if (res.status === 400) {
					setRegisterIsOk(false);
					setShowInfoTooltip(true);
					throw new Error('некорректно заполнено одно из полей');
				} else {
					setRegisterIsOk(true);
					setShowInfoTooltip(true);
				}
			})
			.catch((e) => console.log(e));
	}

	function handleLogin(email, password) {
		return auth
			.authorize(email, password)
			.then((data) => {
				if (data.token) {
					setIsLogged(true);
					localStorage.setItem('token', data.token);
				} else if (data.status === 400) {
					throw new Error('не передано одно из полей');
				} else if (data.status === 401) {
					throw new Error('пользователь с email не найден');
				} else {
					throw new Error('что-то пошло не так');
				}
			})
			.catch((err) => console.log(err));
	}

	function handleSignOut(){
		localStorage.removeItem('token');
		history.push('/sign-in');
		setIsLogged(false);
	}

	const closeInfoTooltipSuccess = () => {
		setShowInfoTooltip(false);
		history.push('/sign-in');
	};

	const closeInfoTooltipFailure = () => {
		setShowInfoTooltip(false);
	};
	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page__content">
				<div className="page">
					<Header 
						isLoggedIn={isLoggedIn}
						setLogged={setIsLogged}
						onSignOut={handleSignOut}
						userInfo={userInfo}
						setUserInfo={setUserInfo}/>
						<Switch>
							<Route path='/sign-up'>
								<Register onRegister={handleRegister}/>
							</Route>
							<Route path='/sign-in'>
								<Login  onLogin ={handleLogin} tokenCheck={tokenCheck} />
							</Route>
							<ProtectedRoute
								exact path="/"
								isLoggedIn={isLoggedIn}
								component={Main}
								onEditAvatar={handleEditAvatarClick}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onCardClick={handleCardClick}
								cards={cards}
								onCardDelete={handleCardDelete}
								onCardLike={handleCardLike}
								>
							</ProtectedRoute>
							<Route>{isLoggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}</Route>
						</Switch>

					<Footer/>
				</div>
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					closeIt={handleCloseAll}
					onUpdateUser={handleUpdateUser}
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					closeIt={handleCloseAll}
					onUpdateAvatar={handleUpdateAvatar}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					closeIt={handleCloseAll}
					onUpdatePlace={handleAddPlace}
				/>
				<PopupWithForm name='popup-confirm'
					title='Вы уверены?'
					buttonText='Да'
					isOpen={false}
					closeIt={handleCloseAll}
				/>
				<ImagePopup isOpen={isImagePopupOpen} card={selectedCard} closeIt={handleCloseAll}/>
				{showInfoTooltip && (
					<InfoTooltip
						onClose={registerIsOk ? closeInfoTooltipSuccess : closeInfoTooltipFailure}
						isOk={registerIsOk}
					/>
				)}
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
