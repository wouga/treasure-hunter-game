import { useState, useEffect } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, resetGame, login, typeName } from "../../../redux";
import routes from "../routes";



export const useLoginPage = () => {
    const fadeTimeout = 1e3;

    const history = useHistory();
    const [showForm, setShowForm] = useState(false);

    const dispatch = useDispatch();

    const {
        name, error, token, isFetching
    } = useSelector((state: RootState) => state.setGame);

    useEffect(() => {
        if ((token && !error)) {
            const path = generatePath(routes.gameBoard, { token })

            setShowForm(false);
            setTimeout(() => history.push(path), fadeTimeout);
        } else {
            setShowForm(true);
        }
    }, [token, error, history]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || isFetching) {
            return null;
        }
        await dispatch(resetGame());
        await dispatch(login(name));
    };

    const hamdleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(typeName(e.target.value));
    };

    return {
        showForm,
        fadeTimeout,
        isFetching,
        error,
        name,
        handleSubmit,
        hamdleInputChange,
    }


}