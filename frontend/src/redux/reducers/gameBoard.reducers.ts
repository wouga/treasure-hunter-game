import {
    REQUEST_GAME,
    RECEIVE_GAME,
    FAIL_GAME,
    GameBoardActionTypes,
    DIG_HOLE,
    BURY_HOLE,
    REQUEST_DISCOVER,
    RECEIVE_DISCOVER,
    FAIL_DISCOVER,
} from '../actions'
import { GameBoardState } from '../types';
import { samePosition } from '../../libs/game.helper';


const initialState: GameBoardState = {

}

export const gameBoard = (
    state = initialState, action: GameBoardActionTypes
): GameBoardState => {
    switch (action.type) {
        case REQUEST_GAME:
            return {
                ...state,
                error: null,
                isFetching: true,
            }
        case RECEIVE_GAME:
            return {
                ...state,
                gridSize: action.gridSize,
                token: action.token,
                name: action.name,
                board: action.board,
                isFetching: false,
                receivedAt: action.receivedAt,
            }
        case FAIL_GAME:
            return {
                ...state,
                error: action.error,
                isFetching: false,
                receivedAt: action.receivedAt,
            }
        case DIG_HOLE:
            return {
                ...state,
                holes: [
                    ...state.holes || [],
                    action.position,
                ],
            }
        case BURY_HOLE:
            return {
                ...state,
                holes: state.holes
                    ?.filter(hole => !samePosition(action.position)(hole)),
            }
        case REQUEST_DISCOVER:
            return {
                ...state,
                error: null,
                isFetching: true,
            }
        case RECEIVE_DISCOVER:
            return {
                ...state,
                board: action.board,
                win: action.win,
                isFetching: false,
                receivedAt: action.receivedAt,
                holes: [],
            }
        case FAIL_DISCOVER:
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
