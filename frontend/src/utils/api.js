 class Api {
    constructor({baseUrl, headers}, token) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getCards()]);
    }


    _handleOriginalResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include'
        }).then(this._handleOriginalResponse)
    }

    setUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
                name:data['name'],
                about:data['about']
            })
        }).then(this._handleOriginalResponse)
    }

    setUserAvatar(data){
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
                avatar: data['avatar']
            })
        }).then(this._handleOriginalResponse)
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include'
        }).then(this._handleOriginalResponse)
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
                name: data['name'],
                link: data['link']
            })
        }).then(this._handleOriginalResponse)
    }

    addLike(data){
        return fetch (`${this.baseUrl}/cards/${data['_id']}/likes/`, {
            method: 'PUT',
            headers: this.headers,
            credentials: 'include'
        }).then(this._handleOriginalResponse)
    }

    deleteLike(data){
        return fetch (`${this.baseUrl}/cards/${data['_id']}/likes/`, {
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include'
        }).then(this._handleOriginalResponse)
    }

    deleteCard(data){
        return fetch(`${this.baseUrl}/cards/${data['_id']}`,{
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include'
        }).then(this._handleOriginalResponse)
    }
}


 export default Api;