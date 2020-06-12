import fetch from 'cross-fetch';
import queryString from 'querystring';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { RootState } from './../reducers'

export const TYPE_NAME = "TYPE_NAME";
export const REQUEST_TOKEN = "REQUEST_TOKEN";
export const RECEIVE_TOKEN = "RECEIVE_TOKEN";
export const FAIL_TOKEN = "FAIL_TOKEN";

interface ITokenData {
    token: string;
    gridSize: number;
}

interface TypeNameAction {
    type: typeof TYPE_NAME;
    name: string;
}

interface RequestTokenAction {
    type: typeof REQUEST_TOKEN;
    name: string;
}

interface ReceiveTokenAction extends ITokenData {
    type: typeof RECEIVE_TOKEN;
    name: string;
    receivedAt: number;
}

interface FailTokenAction {
    type: typeof FAIL_TOKEN;
    name: string;
    error: string;
    receivedAt: number;
}

export type SetGameActionTypes = TypeNameAction | ReceiveTokenAction | RequestTokenAction | FailTokenAction;

export const typeName = (name: string): TypeNameAction => ({
    type: TYPE_NAME,
    name
});

export const login = (
    name: string
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
    dispatch(requestToken(name));

    return fetch('http://localhost:3001/api/v1/login', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })
        .then((resp) => {
            const json = resp.json();

            if (resp.status >= 200 && resp.status < 300) {
                return json;
            } else {
                return json
                    .catch(error => error)
                    .then(({ error }) => Promise.reject(error || "Unknown Error"));
            }
        })
        .then(data => dispatch(receiveToken(name, data)))
        .catch(error => dispatch(failToken(name, error.toString())))
}

export const receiveToken = (
    name: string,
    data: ITokenData,
): ReceiveTokenAction => ({
    type: RECEIVE_TOKEN,
    name,
    receivedAt: Date.now(),
    ...data,
});


export const failToken = (
    name: string,
    error: string,
): FailTokenAction => ({
    type: FAIL_TOKEN,
    name,
    error,
    receivedAt: Date.now()
})

export const requestToken = (
    name: string,
): RequestTokenAction => ({
    type: REQUEST_TOKEN,
    name
})