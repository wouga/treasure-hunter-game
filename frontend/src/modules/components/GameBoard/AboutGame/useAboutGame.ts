import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../hooks/useShallowEqualSelector";
import { toggleAboutGameModal, RootState } from "../../../../redux";

type IUseAboutGame = () => {
    toggleModal: () => void;
    open: boolean;
};

export const useAboutGame: IUseAboutGame = () => {
    const dispatch = useDispatch();
    const open: boolean = useShallowEqualSelector((state: RootState) => state.gameBoard.showAboutGameModal) || false;

    const toggleModal = () => {
        dispatch(toggleAboutGameModal());
    };

    return {
        toggleModal,
        open,
    };

}
