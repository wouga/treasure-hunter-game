import React from 'react';

import { times } from '../../../libs/helpers';
import { Item } from './Item/Item';
import { InfoScreen } from '../InfoScreen/InfoScreen';
import { WinScreen } from './WinScreen/WinScreen';
import { AboutGame } from './AboutGame/AboutGame';
import { useGameBoard } from './useGameBoard';

import './GameBoard.scss';
import { GameButtons } from './GameButtons';


export const GameBoard: React.FC = () => {

    const {
        board, gridSize, handleItemClick,
        isDigged, score, win, holes, ...buttonProps
    } = useGameBoard();

    return (
        <>
            {board && (<div className="game-board">
                <div className="grid">
                    {times(gridSize)
                        .map(y => times(gridSize)
                            .map(x => (
                                <Item
                                    onClick={handleItemClick({ x, y })}
                                    digged={isDigged({ x, y })}
                                    disabled={holes.length >= 3}
                                    key={x + y}
                                    proximity={board[x][y].proximity || null}
                                />
                            )))}

                </div>
            </div>)}
            {board && <GameButtons {...buttonProps} holes={holes} />}
            {!board && (<InfoScreen show={true} timeout={0.5} text={"Loading..."} />)}
            {win && (<InfoScreen
                show={true}
                timeout={0.5}
                text={<WinScreen score={score} />}
            />)}
            <AboutGame />
        </>
    );
}

