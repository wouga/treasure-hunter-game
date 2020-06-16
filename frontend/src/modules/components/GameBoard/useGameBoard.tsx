import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, generatePath } from "react-router-dom";

import {
    RootState, startGame, IPosition, digHole,
    buryHole, resetGame, logout, discover, ICell
} from "../../../redux";
import routes from "../routes";

import { useAboutGame } from "./AboutGame/useAboutGame";
import { setVar } from "../../../libs/css-vars";
import { samePosition } from "../../../libs/game.helper";

const path = generatePath(routes.loginPage);

export interface IButtonProps {
    handleOpenModal: () => void;
    isModalOpen: boolean;
    handleCheckClick: () => void;
    handleNewUserClick: () => void;
    holes: IPosition[];
}

type IUseGameBoard = () => {
    board: ICell[][] | null | undefined;
    gridSize: number;
    handleItemClick: (position: IPosition) => () => void;
    isDigged: (position: IPosition) => boolean;
    score?: number;
    win: boolean;
} & IButtonProps;

export const useGameBoard: IUseGameBoard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useParams();
    const {
        board, error, score,
        gridSize = 5, holes = [], win = false,
    } = useSelector((state: RootState) => state.gameBoard);

    const { open: isModalOpen, toggleModal } = useAboutGame();
    useEffect(() => {
        if (board && gridSize) {
            setVar('grid-size', gridSize.toString());
        }
    }, [board, gridSize]);

    useEffect(() => {
        if (!board) {
            dispatch(startGame(token));
        }
    }, [dispatch, token, board]);

    useEffect(() => {
        if (error && !board) {
            history.push(path);
        }
    }, [error, history, board]);

    const handleItemClick = (position: IPosition) => () => {
        if (!isDigged(position)) {
            return dispatch(digHole(position));
        }

        return dispatch(buryHole(position));
    }

    const handleNewUserClick = async () => {
        await dispatch(resetGame());
        await dispatch(logout());
        history.push(path);
    }

    const handleCheckClick = () => {
        if (holes.length > 0) {
            return dispatch(discover(token, holes));
        }
    }

    const isDigged = useCallback((position: IPosition) => !!holes
        .find(samePosition(position)), [holes]);

    return {
        board,
        gridSize: gridSize || 5,
        handleCheckClick,
        handleItemClick,
        handleNewUserClick,
        handleOpenModal: toggleModal,
        holes,
        isDigged,
        isModalOpen,
        score,
        win,

    }


}