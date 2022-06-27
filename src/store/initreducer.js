import { combineReducers } from "redux";

const initialState = {
    list:1,
    loading:false,
    error: false,
}

const storeReducer = (state=initialState,action) => {
    switch(action.type) {
            case "LIST_DATA":
                return{
                    ...state,
                    loading:true
                }
            case "UPDATED_LIST":
                return{
                    ...state,
                    loading:false,
                    list: state.list+1
                }
            case "REQUEST_ERROR":
                return {
                    ...state,
                   loading:false,
                   error:true
                }
        default:
            return state;
    }
}
export const combinedReducers = combineReducers({
    store : storeReducer
}) 