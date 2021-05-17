import {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    profile: profileReducer,
    error: errorReducer
})