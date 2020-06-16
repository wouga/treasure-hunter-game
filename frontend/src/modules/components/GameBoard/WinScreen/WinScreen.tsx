import React from 'react';
import { Button } from '@material-ui/core';

import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { useWinScreen } from './useWinScreen';

import './WinScreen.scss';

export interface IWinScreen {
    score?: number;
}

export const WinScreen: React.FC<IWinScreen> = ({ score }) => {
    const {
        handleStartAgainClick, scores
    } = useWinScreen();

    return (
        <>
            <h3>Congratulations.<br /> You won.</h3>
            <Button
                onClick={handleStartAgainClick}
                variant="outlined"
                size="large"
                color="secondary"
            >
                Start Again!
            </Button>
            {score && (<h5>You scored {score} points</h5>)}
            {scores && (<ScoreBoard scores={scores} />)}
        </>
    )
};


