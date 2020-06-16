import {
    REQUEST_SCORE_BOARD, RECEIVE_SCORE_BOARD, FAIL_SCORE_BOARD
} from "./scoreBoard.actions";

export interface IScoreItem {
    score: number,
    name: string,
    place: number,
}

export interface IScoresData {
    scores: IScoreItem[];
}


export interface RequestScoreBoardAction {
    type: typeof REQUEST_SCORE_BOARD;
}

export interface ReceivedScoreBoardAction extends IScoresData {
    type: typeof RECEIVE_SCORE_BOARD;
    receivedAt: number;
}

export interface FailScoreBoardAction {
    type: typeof FAIL_SCORE_BOARD;
    error: string;
    receivedAt: number;
}

