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
        handleStartAgainClick, scores, handleNewUserClick,
    } = useWinScreen();


    return (
        <>
            {score && (<h5>Your score: {score}</h5>)}
            <Button
                onClick={handleStartAgainClick}
                variant="outlined"
                size="large"
                color="secondary"
            >
                Start Again!
            </Button><br />
            <Button
                onClick={handleNewUserClick}
                variant="outlined"
                size="large"
                color="secondary"
            >
                New User
            </Button>
            {scores && (<ScoreBoard scores={scores} />)}
        </>
    )
};


