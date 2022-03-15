import { createStore , combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ADD_ITEM } from './initreducer';
 
const rootReducer = combineReducers({
    form : formReducer.plugin({
        inputForm : (state,action) => {
            switch(action.type){
                case ADD_ITEM:
                    return {
                        ...state,
                        values : {
                            ...state.values,
                            email: action.email,
                            password: action.password
                        }
                    }
                    default:
                        return state
            }
        }
    })
})
const store = createStore(rootReducer) 
export default store