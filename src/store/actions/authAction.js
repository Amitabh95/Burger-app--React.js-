import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    };
};

export const authError = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDateTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiryTime * 1000);
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCx_HqFYafAE7c8SnDh0woRIFDOGaRn_7I';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCx_HqFYafAE7c8SnDh0woRIFDOGaRn_7I';
        }
        axios.post(url, authData)
            .then((response) => {
                const expirationDateTime = new Date(new Date().getTime() + (+response.data.expiresIn * 1000));
                localStorage.setItem('expirationDateTime', expirationDateTime);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(+response.data.expiresIn))
            })
            .catch((error) => {
                console.log('Error--> ', error);
                dispatch(authError(error.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('expirationDateTime');
        const userId = localStorage.getItem('userId');
        if (!(token && expiry && userId)) {
            dispatch(logout());
        } else {
            const expirationDateTime = new Date(expiry);
            if (expirationDateTime <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDateTime.getTime() - new Date().getTime())/1000));
            }
        }
    }
}
