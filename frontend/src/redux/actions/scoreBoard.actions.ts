import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { RootState } from './../reducers'
import { fetch, errorHedler } from '../../libs/fetch.helper';
import {
    ReceivedScoreBoardAction,
    RequestScoreBoardAction,
    FailScoreBoardAction,
    IScoresData
} from './scoreBoard.interface';

export const REQUEST_SCORE_BOARD = "REQUEST_SCORE_BOARD";
export const RECEIVE_SCORE_BOARD = "RECEIVE_SCORE_BOARD";
export const FAIL_SCORE_BOARD = "FAIL_SCORE_BOARD";

type IAsyncAction = ThunkAction<void, RootState, unknown, Action<string>>;

export type ScoreBoardActionTypes =
    RequestScoreBoardAction |
    ReceivedScoreBoardAction |
    FailScoreBoardAction;

export const getScoreBoard = (): IAsyncAction => dispatch => {
    dispatch(requestScoreBoard());

    return fetch({ path: 'board', method: 'GET' })
        .then(errorHedler)
        .then(data => dispatch(receiveScoreBoard(data)))
        .catch(error => dispatch(failScoreBoard(error.toString())))
}

export const receiveScoreBoard = (
    data: IScoresData,
): ReceivedScoreBoardAction => ({
    type: RECEIVE_SCORE_BOARD,
    receivedAt: Date.now(),
    ...data,
});


export const failScoreBoard = (
    error: string,
): FailScoreBoardAction => ({
    type: FAIL_SCORE_BOARD,
    error,
    receivedAt: Date.now(),
})

export const requestScoreBoard = (): RequestScoreBoardAction => ({
    type: REQUEST_SCORE_BOARD,
})
