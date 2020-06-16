import React from 'react';
import { ButtonGroup, Button } from "@material-ui/core"

import { IButtonProps } from "./useGameBoard"

export const GameButtons: React.FC<IButtonProps> = ({
    handleOpenModal, isModalOpen, handleCheckClick, holes, handleNewUserClick
}) => (
        <div className="check-btn-wrapper">
            <ButtonGroup size="large" variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={handleOpenModal} disabled={isModalOpen}>About Game</Button>
                <Button disabled={!holes.length} onClick={handleCheckClick} color="secondary">Check!</Button>
                <Button onClick={handleNewUserClick}>New User</Button>
            </ButtonGroup>
        </div>
    );
