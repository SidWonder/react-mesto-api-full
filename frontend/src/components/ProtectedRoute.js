import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...props  }) => {
	return (
		<Route>
			{
				// eslint-disable-next-line react/prop-types
				() => props.isLoggedIn === true ? <Component {...props} /> : <Redirect to='./sign-up'/>
			}
		</Route>
	)}

export default ProtectedRoute;