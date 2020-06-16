import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { RootState } from './../reducers'
import { fetch, errorHedler } from '../../libs/fetch.helper';
import {
    RequestGameAction,
    ReceiveGameAction,
    FailGameAction,
    IStartGameData,
    IPosition,
    DigHoleAction,
    BuryHoleAction,
    RequestDiscoverAction,
    ReceiveDiscoverAction,
    FailDiscoverAction,
    StartAgainAction,
    IDiscoverData,
    ToggleAboutGameModalAction,
} from './gameBoard.interface';

export const REQUEST_GAME = "REQUEST_GAME";
export const RECEIVE_GAME = "RECEIVE_GAME";
export const FAIL_GAME = "FAIL_GAME";
export const DIG_HOLE = "DIG_HOLE";
export const BURY_HOLE = "BURY_HOLE";
export const REQUEST_DISCOVER = "REQUEST_DISCOVER";
export const RECEIVE_DISCOVER = "RECEIVE_DISCOVER";
export const FAIL_DISCOVER = "FAIL_DISCOVER";
export const START_AGAIN = "START_AGAIN";
export const TOGGLE_ABOUT_GAME_MODAL = "TOGGLE_ABOUT_GAME_MODAL";

type IAsyncAction = ThunkAction<void, RootState, unknown, Action<string>>;

export type GameBoardActionTypes =
    RequestGameAction |
    ReceiveGameAction |
    FailGameAction |
    DigHoleAction |
    BuryHoleAction |
    RequestDiscoverAction |
    ReceiveDiscoverAction |
    FailDiscoverAction |
    ToggleAboutGameModalAction |
    StartAgainAction;


export const startGame = (
    token: string
): IAsyncAction => dispatch => {
    dispatch(requestGame(token));

    return fetch({ path: 'game', data: { token } })
        .then(errorHedler)
        .then(data => dispatch(receiveGame(data)))
        .catch(error => dispatch(failGame(error.toString())))
}

export const receiveGame = (
    data: IStartGameData,
): ReceiveGameAction => ({
    type: RECEIVE_GAME,
    receivedAt: Date.now(),
    ...data,
});


export const failGame = (
    error: string,
): FailGameAction => ({
    type: FAIL_GAME,
    error,
    receivedAt: Date.now(),
})

export const requestGame = (
    token: string,
): RequestGameAction => ({
    type: REQUEST_GAME,
    token,
})

export const digHole = (position: IPosition): DigHoleAction => ({
    type: DIG_HOLE,
    position
});

export const buryHole = (position: IPosition): BuryHoleAction => ({
    type: BURY_HOLE,
    position
});

export const toggleAboutGameModal = (): ToggleAboutGameModalAction => ({
    type: TOGGLE_ABOUT_GAME_MODAL,
});


export const discover = (
    token: string,
    holes: IPosition[],

): IAsyncAction => dispatch => {
    dispatch(requestDiscover(token, holes));

    return fetch({ path: 'game/discover', data: { token, holes } })
        .then(errorHedler)
        .then(data => dispatch(receiveDiscover(data)))
        .catch(error => dispatch(failDiscover(error.toString())))
}

export const receiveDiscover = (
    data: IDiscoverData,
): ReceiveDiscoverAction => ({
    type: RECEIVE_DISCOVER,
    receivedAt: Date.now(),
    ...data,
});


export const failDiscover = (
    error: string,
): FailDiscoverAction => ({
    type: FAIL_DISCOVER,
    error,
    receivedAt: Date.now(),
})

export const requestDiscover = (
    token: string,
    holes: IPosition[],
): RequestDiscoverAction => ({
    type: REQUEST_DISCOVER,
    token,
    holes,
});


export const startAgain = (
    token: string
): IAsyncAction => async dispatch => {
    await dispatch({
        type: START_AGAIN,
        token,
    });
    startGame(token);
};

export const resetGame = (
): IAsyncAction => async dispatch => {
    await dispatch({
        type: START_AGAIN,
    });
};

