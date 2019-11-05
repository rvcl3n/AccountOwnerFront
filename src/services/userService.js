import { authHeader } from '../helpers/authHeader';

export const userService = {
    login,
    logout/*,
    register,
    getAll/*,
    getById,
    update,
    delete: _delete*/
};

var apiUrl = "http://localhost:5000";

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl}/api/owner/authenticate`, requestOptions)
        .then(handleResponse)
        .then(owner => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('owner', JSON.stringify(owner));

            return owner;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('owner');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    console.log(authHeader());

    return fetch(`${apiUrl}/api/owner`, requestOptions).then(handleResponse);
}

/*function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}*/

/*function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}*/

/*function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}*/

// prefixed function name with underscore because delete is a reserved word in javascript
/*function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}*/

function handleResponse(response) {
    //console.log(response);
    return response.text().then(text => {       
        const data = text && JSON.parse(text);

        console.log("data "+data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}