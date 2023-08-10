import axios from "axios";
import * as actionTypes from "./actionTypes";
import { navigate } from "../App"

export const add_account = (account) => {
    return {
        type: actionTypes.ADD_ACCOUNT,
        payload: account
    }
}

const add_database_account = (accounts) => {
    return {
        type: actionTypes.ADD_DATABASE_ACCOUNT,
        payload: accounts
    }
}


const store_token = (token) => {
    return {
        type: actionTypes.STORE_TOKEN,
        payload: token
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}


const loginLoader = (status) => {
    return {
        type: actionTypes.SHOW_LOGIN_LOADER,
        payload: status
    }
}


export const userAuthenication = (email, password, mode) => dispatch => {
    dispatch(loginLoader(true))
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let url = ""
    if (mode == 'signup') {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAy2JQq0CeBf9Kchv1-tnQLx4B0_8W0pps"
    }
    else {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAy2JQq0CeBf9Kchv1-tnQLx4B0_8W0pps"
    }
    axios.post(url, authData)
        .then(res => {
            dispatch(loginLoader(false))
            dispatch(store_token({ token: res.data.idToken, uid: res.data.localId }))
            navigate("Home")
        })
        .catch(error => {
            dispatch(loginLoader(false))
            alert(error.response.data.error.message)

        })
}


export const post_account_to_database = (account) => dispatch => {
    axios.post("https://finance-app-f4d50-default-rtdb.firebaseio.com/accounts.json", account)
        .then(res => res)
        .catch(err => console.log(err))
}




export const get_accounts_from_database = () => dispatch => {



    axios.get(`https://finance-app-f4d50-default-rtdb.firebaseio.com/accounts.json`)
        .then(res => dispatch(add_database_account(res.data)))
        .catch(err => alert(err.response.data.error.message))
}