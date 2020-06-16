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
    START_AGAIN,
    TOGGLE_ABOUT_GAME_MODAL,
} from '../actions'
import { GameBoardState } from '../types';
import { samePosition } from '../../libs/game.helper';


const initialState: GameBoardState = {
    board: null,
    win: false,
    gridSize: null,
    holes: [],
    showAboutGameModal: false,
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
                win: false,
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
        case TOGGLE_ABOUT_GAME_MODAL:
            return {
                ...state,
                showAboutGameModal: !state.showAboutGameModal,
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
                score: action.score,
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
        case START_AGAIN:
            return {
                ...state,
                ...initialState,
                token: action.token,
            }
        default:
            return state
    }
};
