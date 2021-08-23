import headerLogo from '../img/header/header-logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Header({isLoggedIn, setLogged, onSignOut, userInfo, setUserInfo}) {
	// eslint-disable-next-line react/prop-types
	const { email } = userInfo;
	const currentLocation = useLocation();

	const { pathname } = currentLocation;
	const path = currentLocation.pathname === '/sign-in' ? '/sign-up' : '/sign-in';

	return (
		<header className="header">
			<Link to="/" target="_self" className="header__link">
				<img className="header__logo" src={headerLogo} alt="Место Россия"/>
			</Link>
			<div className="header__nav">
				{email && <div className="header__email">{pathname === '/' ? email : ''}</div>}
				{isLoggedIn ? (
					<Link
						to='/'
						onClick={() => onSignOut()}
						className="header__link"
					>
						Выйти
					</Link>
				) : (
					<Link to={path} className="header__link-noauth">
						{pathname === '/sign-in' ? 'Регистрация' : 'Войти'}
					</Link>
				)}
			</div>
		</header>
	);
}