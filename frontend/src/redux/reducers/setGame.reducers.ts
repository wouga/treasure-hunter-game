import {
    TYPE_NAME,
    REQUEST_TOKEN,
    RECEIVE_TOKEN,
    FAIL_TOKEN,
    SetGameActionTypes,
    LOGOUT,
} from '../actions'
import { SetGameState } from '../types';


const initialState: SetGameState = {
    name: '',
    token: '',
    gridSize: 5,
    isFetching: false,
}

export const setGame = (
    state = initialState, action: SetGameActionTypes
): SetGameState => {
    switch (action.type) {
        case TYPE_NAME:
            return {
                ...state,
                name: action.name,
            };
        case LOGOUT:
            return {
                ...state,
                ...initialState,
            };
        case REQUEST_TOKEN:
            return {
                ...state,
                error: null,
                isFetching: true,
            }
        case RECEIVE_TOKEN:
            return {
                ...state,
                token: action.token,
                name: action.name,
                isFetching: false,
                receivedAt: action.receivedAt,
            }
        case FAIL_TOKEN:
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
