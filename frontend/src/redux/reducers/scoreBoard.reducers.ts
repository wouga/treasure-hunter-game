import {
    REQUEST_SCORE_BOARD,
    RECEIVE_SCORE_BOARD,
    FAIL_SCORE_BOARD,
    ScoreBoardActionTypes,
} from '../actions'
import { ScoreBoardState } from '../types';


const initialState: ScoreBoardState = {
    scores: [],
}

export const scoreBoard = (
    state = initialState, action: ScoreBoardActionTypes
): ScoreBoardState => {
    switch (action.type) {
        case REQUEST_SCORE_BOARD:
            return {
                ...state,
                error: null,
                isFetching: true,
            }
        case RECEIVE_SCORE_BOARD:
            return {
                ...state,
                scores: action.scores,
                isFetching: false,
                receivedAt: action.receivedAt,
            }
        case FAIL_SCORE_BOARD:
            return {
                ...state,
                error: action.error,
                isFetching: false,
                receivedAt: action.receivedAt,
            }
        default:
            return state
    }
};
