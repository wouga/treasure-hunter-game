import { IPosition } from "../redux/actions/gameBoard.interface";

export const samePosition = ({ x, y }: IPosition) => (hole: IPosition): boolean => {
    return hole.x === x && hole.y === y;
};