import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, generatePath } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

import routes from '../routes';

import { typeName, login } from '../../../redux/actions';
import { SendButton } from './SendButton';

import './LoginPage.scss';
import { RootState } from '../../../redux/reducers';

const fadeTimeout = 1e3;

export const LoginPage = () => {
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);
    const {
        name, error, token, isFetching
    } = useSelector((state: RootState) => state.setGame);
    const dispatch = useDispatch();

    useEffect(() => {
        if ((token && !error)) {
            const path = generatePath(routes.playground, { token })

            setShowForm(false);
            setTimeout(() => history.push(path), fadeTimeout);
        } else {
            setShowForm(true);
        }
    }, [token, error])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || isFetching) {
            return null;
        }

        dispatch(login(name));
    }

    return (
        <Fade in={showForm} timeout={fadeTimeout}>
            <div className="login-page">
                <form onSubmit={handleSubmit}>
                    <label>To start the game,</label>
                    <div className="input-wrapper">
                        <input
                            spellCheck="false"
                            value={name}
                            onChange={(e) => dispatch(typeName(e.target.value))}
                            placeholder="enter your name..."
                        />
                        <SendButton disabled={!name || isFetching} />
                    </div>
                    <p className="input-error">{error}</p>
                </form>
            </div>
        </Fade>
    );
}
