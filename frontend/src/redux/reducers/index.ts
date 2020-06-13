import { combineReducers } from 'redux'

import { setGame } from './setGame.reducers';
import { gameBoard } from './gameBoard.reducers';

const rootReducer = combineReducers({
    setGame,
    gameBoard,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>