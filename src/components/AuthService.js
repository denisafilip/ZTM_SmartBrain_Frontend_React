const API_URL = 'http://localhost:8080/';

class AuthService {
    signin = (email, password) => {
        return fetch(API_URL + 'signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(response => response.json())
            .catch(console.log);
    }

    logout = () => {
        localStorage.removeItem('user');
    }

    register = (name, email, password) => {
        return fetch(API_URL + 'register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })
        })
            .then(response => response.json())
            .catch(console.log);
    }

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();