import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        // this.domain = domain || `http://localhost:1122`;
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }
    login(email, password) {
        return fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            return res.json();
        })
            .then(res => {
                if (res.sucess == true) {
                    this.setToken(res.token);
                    return Promise.resolve(res);
                }
            })
    }
    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (this.loggedIn())
            headers['Authorization'] = `Bearer ${this.getToken()}`

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(res => res.json())
    }
    getToken() {
        return localStorage.getItem('id_token');
    }
    setToken(idToken) {
        return localStorage.setItem('id_token', idToken);
    }
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        try {
            const tdecode = decode(token);
            if (tdecode.exp > Date.now() / 100) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    logout() {
        localStorage.removeItem('id_token');
    }
    getProfile() {
        return decode(this.getToken());
    }
    _checkStatus(res) {
        if (res.status >= 200 && res < 300)
            return res;
        else {
            let error = new Error(res);
            error.res = res;
            throw error;
        }
    }
}