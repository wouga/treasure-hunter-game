export interface SetGameState {
    name: string;
    token: string;
    gridSize: number;
    error?: string | null;
    isFetching?: boolean;
    receivedAt?: number;
}
