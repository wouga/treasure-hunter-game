import { combineReducers } from 'redux'

import { setGame } from './setGame.reducers';
import { gameBoard } from './gameBoard.reducers';
import { scoreBoard } from './scoreBoard.reducers';

const rootReducer = combineReducers({
    setGame,
    gameBoard,
    scoreBoard,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
