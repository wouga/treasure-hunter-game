import React from 'react';
import classNames from 'classnames';

import './InfoScreen.scss';

export interface IInfoScreen {
    show?: boolean,
    timeout?: number;
    text?: string | null;
}

export const InfoScreen: React.FC<IInfoScreen> = ({
    show, timeout, text,
}) => {
    const css = classNames("info-screen",
        {
            show: show,
            hide: !show
        }
    );

    return (
        <>
            {text && (
                <div className={css} style={{ animationDuration: `${timeout}s` }}>
                    <span>{text}</span>
                </div>
            )}
        </>

    );
};

InfoScreen.defaultProps = {
    timeout: 1,
    show: false,
    text: null,
}
