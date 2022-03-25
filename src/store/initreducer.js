import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

const initialState = {
    loading : false,
    user : null,
    token: null,
    id: null,
    data: []
}

const AuthReducer = (state=initialState,action) => {
    switch(action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.response[1],
                id: action.response[0],
                token: action.response[2],
                loading: false,
            };

        case "LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
            };
            case "LOGOUT":
            return {
                ...state,
                user: null,
                id: null,
                token: null,
                loading: false,
            };
            case "FETCH_DATA":
                return {
                    ...state,
                    loading: true
                }
            case "SET_DATA":
                return{
                    ...state,
                    loading: false,
                    data: [action.response[0],action.response[1]]
                }
            case "REQUEST_ERROR":
                return {
                    ...state,
                    data: [action.response[0], action.response[1]]
                }
        default:
            return state;
    }
}
export const combinedReducers = combineReducers({
    form : formReducer,
    Auth : AuthReducer
}) 