import {
    ADD_TASK,
    DELETE_TASK,
    CHANGE_TASK,
    GET_PROFILE,
    TASKS_LOADING,
    PROFILE_LOADING,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    DELETE_ACCOUNT
} from '../actions/types'
import { returnError } from './errorAction'
import axios from 'axios'

export const getProfile = () => (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING })

    axios
        .get('/profile/', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = (data) => dispatch => {
    axios.post('/profile/register', data)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })

        })
}
export const login = (data) => dispatch => {
    axios.post('/profile/login', data)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })

        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const deleteAccount = () => (dispatch, getState) => {
    axios.post('/profile/delete', null, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: DELETE_ACCOUNT
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })

}

export const addTask = (taskToAdd) => (dispatch, getState) => {
    axios.post('/profile/task', taskToAdd, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_TASK,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const changeTask = (task) => (dispatch, getState) => {
    axios.put('/profile/task', task, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHANGE_TASK,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const deleteTask = (id) => (dispatch, getState) => {
    axios.delete(`/profile/task/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_TASK,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const setTasksLoading = () => {
    return {
        type: TASKS_LOADING
    }
}

export const tokenConfig = (getState) => {
    const token = getState().profile.token
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config
}