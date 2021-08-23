export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) =>  fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
    }).then((res) => res)
    .catch((err) => console.log(err));

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
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
}).then((res) => res)
    .catch((err) => console.log(err));
