import React from 'react';

import './ScoreBoard.scss';
import { List, ListItem, ListItemText, ListItemIcon, } from '@material-ui/core';
import { IScoreItem } from '../../../../redux/actions/scoreBoard.interface';


export interface IScoreBoard {
    scores: IScoreItem[]
}

export const ScoreBoard: React.FC<IScoreBoard> = ({
    scores
}) => {
    return (
        <div className={"score-board"}>
            <h5>Score Board:</h5>
            <List>
                {
                    scores.map((score, idx) => (
                        <ListItem key={idx}>
                            <ListItemIcon>#{score.place}</ListItemIcon>
                            <ListItemText primary={score.name} secondary={`${score.score} points`} />
                        </ListItem>
                    ))
                }

            </List>
        </div>
    );
};
