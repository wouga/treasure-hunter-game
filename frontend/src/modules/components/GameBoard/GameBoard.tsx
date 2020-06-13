import React, { useEffect, useState } from 'react';
import { Fade, Button } from '@material-ui/core';

import { setVar } from '../../../libs/css-vars';

import './GameBoard.scss';
import { Item } from './Item/Item';
import { useParams, generatePath, useHistory } from 'react-router-dom';
import { RootState } from '../../../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { startGame, digHole, buryHole, discover } from '../../../redux/actions';
import routes from '../routes';
import { IPosition } from '../../../redux/actions/gameBoard.interface';
import { samePosition } from '../../../libs/game.helper';
import { InfoScreen } from '../InfoScreen/InfoScreen';

export const GameBoard = () => {
    const fadeTimeout = 1e3;
    const dispatch = useDispatch();
    const history = useHistory();
    const [showGameBoard, setShowGameBoard] = useState(false);
    const { token } = useParams();
    const {
        board, error, gridSize = 5, holes = [], win = false,
    } = useSelector((state: RootState) => state.gameBoard);
    useEffect(() => {
        if (board && gridSize) {
            setVar('grid-size', gridSize.toString());
            setShowGameBoard(true);
        }
    }, [board, gridSize]);

    useEffect(() => {
        if (!board) {
            dispatch(startGame(token));
        }
    }, [token, board]);

    useEffect(() => {
        if (error && !board) {
            const path = generatePath(routes.loginPage)

            setShowGameBoard(false);
            setTimeout(() => history.push(path), fadeTimeout);
        }
    }, [error]);

    const handleItemClick = (position: IPosition) => () => {
        if (!isDigged(position)) {
            return dispatch(digHole(position));
        }
        return dispatch(buryHole(position));

    }

    const handleCheckClick = () => {
        if (holes.length > 0) {
            return dispatch(discover(token, holes));
        }
    }

    const isDigged = (position: IPosition) => !!holes.find(samePosition(position))

    return (
        <>
            <Fade in={showGameBoard} timeout={fadeTimeout}>
                <>
                    {board && (<div className="game-board">
                        <div className="grid">
                            {[...Array(gridSize)]
                                .map((_, y) => [...Array(gridSize)]
                                    .map((_, x) => (
                                        <Item
                                            onClick={handleItemClick({ x, y })}
                                            digged={isDigged({ x, y })}
                                            disabled={holes.length >= 3}
                                            key={x + y} proximity={
                                                board[x][y].proximity || null
                                            } />
                                    )))}

                        </div>
                    </div>)}
                    <div className="check-btn-wrapper">
                        {!!holes.length && (
                            <Button
                                onClick={handleCheckClick}
                                variant="outlined"
                                size="large"
                                color="secondary"
                            >
                                CHECK!
                            </Button>
                        )}
                    </div>
                </>
            </Fade>
            {!board && (<InfoScreen show={true} timeout={0} text={"Loading..."} />)}
            {win && (<InfoScreen show={true} timeout={0} text={"Congratulations. You won."} />)}
        </>
    );
}


