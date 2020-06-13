import { TYPE_NAME, REQUEST_TOKEN, RECEIVE_TOKEN, FAIL_TOKEN } from "./setGame.actions";

export interface ITokenData {
    token: string;
    gridSize: number;
}

export interface TypeNameAction {
    type: typeof TYPE_NAME;
    name: string;
}

export interface RequestTokenAction {
    type: typeof REQUEST_TOKEN;
    name: string;
}

export interface ReceiveTokenAction extends ITokenData {
    type: typeof RECEIVE_TOKEN;
    name: string;
    receivedAt: number;
}

export interface FailTokenAction {
    type: typeof FAIL_TOKEN;
    name: string;
    error: string;
    receivedAt: number;
}