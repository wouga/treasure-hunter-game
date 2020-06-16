import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import { useAboutGame } from './useAboutGame';

import './AboutGame.scss';

export const AboutGame: React.FC = () => {
    const {
        toggleModal, open
    } = useAboutGame();

    return (
        <Dialog
            open={open}
            onClose={toggleModal}
        >
            <DialogTitle>About Treasure Hunter Game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p>
                        <strong>Game rules:</strong>
                        <ul>
                            <li>The goal of the game is to find 3 treasures in minimum number of turns (number of turns will be the player score).</li>
                            <li>The board is of size 5x5</li>
                            <li>At the beginning of the board is blank.</li>
                            <li>During each turn player can reveal up to 3 positions.</li>
                        </ul>
                    </p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleModal} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
};


