/*
* File: Actions.js
* All the redux actions that the app is used
*/
import {
    USER_LOGIN,
    AUTH_OBJ,
    SHOW_LOADER,
    OPERATOR_CREATE,
    OPERATOR_LIST,
    OPERATOR_DELETE,
    OPERATOR_CURRENT_PAGE
} from './ActionTypes';
import _ from 'lodash';

export const onUserLoginLogout = (status) => {
    //Changing status - during login and logout
    return {
        type: USER_LOGIN,
        payload: status
    }
}

export const onShowLoaderChange = (status) => {
    //A loader - to use with asynchronous operations
    return {
        type: SHOW_LOADER,
        payload: status
    }
}

export const AuthInfo = () => {
    //Retrieve the auth obj - right now only email is there
    const auth = localStorage.getItem("admin-auth");
    if (!_.isNil(auth)) {
        const authObj = JSON.parse(auth);
        return {
            type: AUTH_OBJ,
            payload: authObj
        }
    } else {
        return {
            type: AUTH_OBJ,
            payload: null
        }
    }
}

export const onPageChange = (page) => {
    //Called during admin side - operator prefix list pager
    return {
        type: OPERATOR_CURRENT_PAGE,
        payload: page
    }
}

export const getOperatorList = () => {
    //Get the operator and prefix list - the core thing in the application
    return dispatch => {
        dispatch({
            type: OPERATOR_LIST,
            payload: []
        })
    }
}


export const onOperatorCreate = (Operator) => {
    //When a new prefix + rate is created, it is added to the existing list.
    // Now no api/persistant storage is used, so the data will be lost with page refresh/ new tab
    return dispatch => {
        dispatch({
            type: OPERATOR_CREATE,
            payload: Operator
        });
    }
}

export const onOperatorEdit = (Operator) => {
    //TODO
}


export const onOperatorDelete = (Operator) => {
    //Delete a prefix + rate listed in the /admin
    return {
        type: OPERATOR_DELETE,
        payload: Operator
    }
}

