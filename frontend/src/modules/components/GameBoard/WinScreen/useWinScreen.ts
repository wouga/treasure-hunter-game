import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IScoreItem, RootState, getScoreBoard, startAgain } from "../../../../redux";
import { useShallowEqualSelector } from "../../../hooks/useShallowEqualSelector";

type IUseWinScreen = () => {
    handleStartAgainClick: () => void;
    scores: IScoreItem[];
};

export const useWinScreen: IUseWinScreen = () => {
    const dispatch = useDispatch();
    const {
        scores, token,
    } = useShallowEqualSelector((state: RootState) => ({
        scores: state.scoreBoard.scores,
        token: state.setGame.token,
    }));

    useEffect(() => { dispatch(getScoreBoard()) }, [dispatch])
    const handleStartAgainClick = () => dispatch(startAgain(token));

    return {
        handleStartAgainClick,
        scores,
    };

}
