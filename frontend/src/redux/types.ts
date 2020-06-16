import { IStartGameData, IPosition } from "./actions/gameBoard.interface";
import { IScoresData } from "./actions/scoreBoard.interface";

export interface SetGameState {
    name: string;
    token: string;
    gridSize: number;
    error?: string | null;
    isFetching?: boolean;
    receivedAt?: number;
}

export interface GameBoardState extends IStartGameData {
    error?: string | null;
    isFetching?: boolean;
    receivedAt?: number;
    holes?: IPosition[];
    win?: boolean;
    score?: number;
    showAboutGameModal?: boolean;
}

export interface ScoreBoardState extends IScoresData {
    error?: string | null;
    isFetching?: boolean;
    receivedAt?: number;
}
