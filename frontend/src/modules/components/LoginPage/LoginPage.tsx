import React, { useEffect, useRef } from 'react';

import { SendButton } from './SendButton';
import { useLoginPage } from './useLoginPage';

import './LoginPage.scss';


export const LoginPage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        showForm, handleSubmit, hamdleInputChange,
        isFetching, error, name,
    } = useLoginPage();



    useEffect(() => {
        inputRef?.current?.focus();
    });

    return (
        <>
            <h1 className="game-title">Treasure Hunter Game</h1>
            <div className="login-page">
                <form onSubmit={handleSubmit}>
                    <label>To start the game,</label>
                    <div className="input-wrapper">
                        <input
                            ref={inputRef}
                            spellCheck="false"
                            value={name}
                            onChange={hamdleInputChange}
                            placeholder="enter your name..."
                        />
                        <SendButton disabled={!name || isFetching} />
                    </div>
                    <p className="input-error">
                        {error} {(!showForm || isFetching) && !error && "Loading..."}
                    </p>
                </form>
            </div>
        </>
    );
}
