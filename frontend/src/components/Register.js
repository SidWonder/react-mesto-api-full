// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// eslint-disable-next-line react/prop-types
export default function Register ({onRegister}) {
	const [data, setData] = React.useState({
		email: '',
		password: '',
	});

	function handleChange(evt) {
		const {name, value} = evt.target;

		setData({
			...data,
			[name]: value,
		});
	}
		function handleSubmit(evt) {
			evt.preventDefault();
			const {email, password} = data;
			onRegister(email, password);
		}

	return (<>
		<Form name="register-form" title="Регистрация" onSubmit={handleSubmit}>
			<label className="authform__label">
				<input
					type="email"
					className="authform__input authform__input_type_email"
					id="email-input"
					value={data.email}
					name="email"
					placeholder="Email"
					required
					minLength="2"
					maxLength="40"
					onChange={handleChange}
				/>
				<span className="form__error" id="email-input-error" />
			</label>
			<label className="form__label">
				<input
					type="password"
					className="authform__input authform__input_type_password"
					id="password-input"
					value={data.password}
					name="password"
					placeholder="Пароль"
					required
					minLength="8"
					maxLength="200"
					onChange={handleChange}
				/>
				<span className="form__error" id="password-input-error" />
			</label>
			<button
				type="submit"
				className="authform__button"
			>
				Зарегистрироваться
			</button>
			<p className="authform__login">
				Уже зарегистрированы?{' '}
				<Link to='/sign-in' className="authform__link">
					Войти
				</Link>
			</p>
		</Form>
	</>);
}