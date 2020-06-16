import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";

import { IScoreItem, RootState, getScoreBoard, startAgain, resetGame, logout } from "../../../../redux";
import { useShallowEqualSelector } from "../../../hooks/useShallowEqualSelector";
import routes from "../../routes";

const path = generatePath(routes.loginPage);

type IUseWinScreen = () => {
    handleStartAgainClick: () => void;
    scores: IScoreItem[];
    handleNewUserClick: () => void;
};

export const useWinScreen: IUseWinScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        scores, token,
    } = useShallowEqualSelector((state: RootState) => ({
        scores: state.scoreBoard.scores,
        token: state.setGame.token,
    }));

    useEffect(() => { dispatch(getScoreBoard()) }, [dispatch])
    const handleStartAgainClick = () => dispatch(startAgain(token));

    const handleNewUserClick = async () => {
        await dispatch(resetGame());
        await dispatch(logout());
        history.push(path);
    }

    return {
        handleStartAgainClick,
        scores,
        handleNewUserClick
    };

}
