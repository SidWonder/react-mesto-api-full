export const BASE_URL = 'https://sidwonder.mesto.nomoredomains.club/api';

export const register = (email, password) =>  fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password, email }),
    }).then((res) => res)
    .catch((err) => console.log(err));

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email  }),
}).then((res) => (res.ok ? res.json() : res))
    .catch((err) => console.log(err));

export const getUserData = (token) => fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
}).then((res) => res)
    .catch((err) => console.log(err));
