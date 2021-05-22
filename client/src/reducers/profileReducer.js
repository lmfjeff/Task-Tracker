/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_TASK,
    DELETE_TASK,
    CHANGE_TASK,
    GET_PROFILE,
    TASKS_LOADING,
    PROFILE_LOADING,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    DELETE_ACCOUNT
} from '../actions/types'

const initialState = {
    profile: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case DELETE_TASK:
        case ADD_TASK:
        case CHANGE_TASK:
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        case TASKS_LOADING:
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                profile: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}