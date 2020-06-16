import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { RootState } from './../reducers'
import { TypeNameAction, ReceiveTokenAction, RequestTokenAction, FailTokenAction, ITokenData, LogoutAction } from './setGame.interface';
import { fetch, errorHedler } from '../../libs/fetch.helper';

export const TYPE_NAME = "TYPE_NAME";
export const REQUEST_TOKEN = "REQUEST_TOKEN";
export const RECEIVE_TOKEN = "RECEIVE_TOKEN";
export const FAIL_TOKEN = "FAIL_TOKEN";
export const LOGOUT = "LOGOUT";

type IAsyncAction = ThunkAction<void, RootState, unknown, Action<string>>;

export type SetGameActionTypes = TypeNameAction | ReceiveTokenAction | RequestTokenAction | FailTokenAction | LogoutAction;

export const typeName = (name: string): TypeNameAction => ({
    type: TYPE_NAME,
    name
});

export const login = (
    name: string
): IAsyncAction => dispatch => {
    dispatch(requestToken(name));

    return fetch({ path: 'login', data: { name } })
        .then(errorHedler)
        .then(data => dispatch(receiveToken(name, data)))
        .catch(error => dispatch(failToken(name, error.toString())))
}

export const logout = (): LogoutAction => ({
    type: LOGOUT,
});

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