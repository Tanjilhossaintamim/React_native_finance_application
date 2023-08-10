import * as actionTypes from "./actionTypes";

const initialState = {
    accounts: [],
    token: null,
    is_auth: false,
    user_id: null,
    auth_loading: false,
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ACCOUNT:

            return {
                ...state,
                accounts: state.accounts.concat(action.payload)
            }
        case actionTypes.STORE_TOKEN:

            return {
                ...state,
                token: action.payload.token,
                is_auth: true,
                user_id: action.payload.uid
            }

        case actionTypes.ADD_DATABASE_ACCOUNT:

            const userAccounts = [];
            for (let key in action.payload) {
                userAccounts.push(action.payload[key])
            }
            return {
                ...state,
                accounts: userAccounts
            }

        case actionTypes.LOGOUT:

            return {
                ...state,
                token: null,
                auth_loading: false
            }

        case actionTypes.SHOW_LOGIN_LOADER:
            return {
                ...state,
                auth_loading: action.payload
            }

        default:
            return state
    }
}


export default Reducer;