export default class Http {
    constructor(url) {
        this.url = url;
    }

    add(item) {
        return fetch(`${this.url}/resultFlag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    }

    userAccess(token) {
        return fetch(`${this.url}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });
    }

    auth(user) {
        return fetch(`${this.url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    updateData(user) {
        return fetch(`${this.url}/updateData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }


}
