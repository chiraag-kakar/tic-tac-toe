import {HIDE_LOADING, MARK, RESET, SHOW_LOADING, GET_STATE, GET_LOG} from './types';
import axios from 'axios';
import {API_URL} from '../config/api.config';

export function reset() {

    return dispatch => {
        axios.get(`${API_URL}/reset`)
            .then(response => dispatch({
                type: RESET,
                payload: response.data
            }))
            .catch(() => {
                // Terrible fail :(
            });
    };
}

export function mark(x, y) {
    return dispatch => {
        axios.get(`${API_URL}/mark?x=${x}&y=${y}`)
            .then(response => dispatch({
                type: MARK,
                payload: response.data
            }))
            .catch(() => {
                // Terrible fail :(
            });
    };
}

export function getState() {
    return dispatch => {
        axios.get(`${API_URL}/state`)
            .then(response => {
                if (response.data.started) {
                    return dispatch({
                        type: GET_STATE,
                        payload: response.data
                    });
                } else {
                    return reset();
                }
            })
            .catch(() => {
                // Terrible fail :(
            });
    };
}

export function getLog() {
    return dispatch => {
        axios.get(`${API_URL}/log`)
            .then(response => dispatch({
                type: GET_LOG,
                payload: response.data.log
            }))
            .catch(() => {
                // Terrible fail :(
            });
    };
}

export function showLoading() {
    return {
        type: SHOW_LOADING
    };
}

export function hideLoading() {
    return {
        type: HIDE_LOADING
    };
}
