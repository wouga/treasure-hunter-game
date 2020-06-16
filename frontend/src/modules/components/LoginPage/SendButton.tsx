import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

interface ISendButton {
    disabled?: boolean;
}

export const SendButton: React.FC<ISendButton> = ({
    disabled
}) => {
    return (
        <IconButton
            disabled={disabled}
            type="submit"
            className="icon-button"
            aria-label="let's play"
            role="submit-button"
        >
            <ArrowRightIcon />
        </IconButton>
    )
}

SendButton.defaultProps = {
    disabled: false,
}
