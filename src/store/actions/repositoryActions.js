import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import * as errorHandlerActions from './errorHandlerActions';
import { userService } from '../../services/userService';
import { history } from '../../helpers/historyHepler';
import { authHeader } from '../../helpers/authHeader';

const getDataSuccess = (data) => {
    console.log("getDataSuccess");
    console.log(data);
    return {
        type: actionTypes.GET_DATA_SUCCESS,
        data: data
    }
}
 
export const getData = (url, props) => {
    return (dispatch) => {
        axios.get(url,{ headers: authHeader()})
        .then(handleResponse)
        .then(data => {
            dispatch(getDataSuccess(data));
        })
        .catch(error => {
            dispatch(errorHandlerActions.handleHTTPError(error, props));
        })
    }
}

const postDataSuccess = (response) => {
    return {
        type: actionTypes.POST_DATA_SUCCESS,
        response: response
    }
}
 
export const postData = (url, obj, props) => {
    return (dispatch) => {
        axios.post(url, obj,{ headers: authHeader()})
        .then(handleResponse)
        .then(response => {
            dispatch(postDataSuccess(response));
        })
        .catch(error => {
            dispatch(errorHandlerActions.handleHTTPError(error, props));
        })
    }
}
 
const putDataSuccess = (response) => {
    return {
        type: actionTypes.PUT_DATA_SUCCESS,
        response: response
    }
}
 
export const putData = (url, obj, props) => {
    return (dispatch) => {
        axios.put(url, obj,{ headers: authHeader()})
        .then(handleResponse)
        .then(response => {
            dispatch(putDataSuccess(response));
        })
        .catch(error => {
            dispatch(errorHandlerActions.handleHTTPError(error, props));
        })
    }
}
 
const deleteDataSuccess = (response) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        response: response
    }
}
 
export const deleteData = (url, props) => {
    return (dispatch) => {
        axios.delete(url,{ headers: authHeader()})
        .then(handleResponse)
        .then(response => {
            dispatch(deleteDataSuccess(response));
        })
        .catch(error => {
            dispatch(errorHandlerActions.handleHTTPError(error, props));
        })
    }
}

export const closeSuccessModal = (props, url) =>{
    return {
        type: actionTypes.CLOSE_SUCCESS_MODAL,
        props: props,
        url: url
    }
}

export function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        axios.post("http://localhost:5000/api/owner/authenticate", 
           JSON.stringify({ email, password}),
                {headers: { 'Content-Type': 'application/json' }}
                ).then(handleResponse).then(owner => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('owner', JSON.stringify(owner));
                    console.log("owner "+owner);
                    return owner;
                }).then(
                    owner => { 
                        dispatch(success(owner));
                        this.history.push('/');
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        //dispatch(alertActions.error(error.toString()));
                    }
                );
    };

    function request(user) { return { type: actionTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: actionTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: actionTypes.LOGIN_FAILURE, error } }
}

export function logout() {
    //userService.logout();
    return { type: actionTypes.LOGOUT };
}

export function register(user) {
    return dispatch => {
        //dispatch(request({ email }));
        axios.post("http://localhost:5000/api/owner/register", 
           JSON.stringify(user),
                {headers: { 'Content-Type': 'application/json' }}
                ).then(handleResponse)};
}

function handleResponse(response) {
        console.log("resp");
        const data = response.data;
        return data;
    
}