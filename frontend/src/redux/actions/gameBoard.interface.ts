import { REQUEST_GAME, RECEIVE_GAME, FAIL_GAME, DIG_HOLE, BURY_HOLE, REQUEST_DISCOVER, RECEIVE_DISCOVER, FAIL_DISCOVER, START_AGAIN, TOGGLE_ABOUT_GAME_MODAL } from "./gameBoard.actions";

export interface ICell {
    proximity?: number | string;
    revealed?: boolean;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IStartGameData {
    token?: string;
    gridSize?: number | null;
    name?: string;
    board?: Array<Array<ICell>> | null;
}

export interface IDiscoverData {
    board?: Array<Array<ICell>>;
    win?: boolean;
    score?: number;
}

export interface RequestGameAction {
    type: typeof REQUEST_GAME;
    token: string;
}

export interface ReceiveGameAction extends IStartGameData {
    type: typeof RECEIVE_GAME;
    receivedAt: number;
}

export interface FailGameAction {
    type: typeof FAIL_GAME;
    error: string;
    receivedAt: number;
}


export interface DigHoleAction {
    type: typeof DIG_HOLE;
    position: IPosition;
}

export interface BuryHoleAction {
    type: typeof BURY_HOLE;
    position: IPosition;
}

export interface RequestDiscoverAction {
    type: typeof REQUEST_DISCOVER;
    holes: IPosition[];
    token: string;
}

export interface ReceiveDiscoverAction extends IDiscoverData {
    type: typeof RECEIVE_DISCOVER;
    receivedAt: number;
}

export interface FailDiscoverAction {
    type: typeof FAIL_DISCOVER;
    error: string;
    receivedAt: number;
}

export interface StartAgainAction {
    type: typeof START_AGAIN;
    token: string;
}

export interface ToggleAboutGameModalAction {
    type: typeof TOGGLE_ABOUT_GAME_MODAL;
}