import React from 'react';
import classNames from 'classnames';

import './Item.scss';

export interface IItem {
    proximity?: number | string | null;
    digged?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export const Item: React.FC<IItem> = ({
    digged, disabled, proximity, onClick
}) => {
    const isProximity = proximity !== null;
    const itemCss = classNames("item",
        {
            [`proximity-${proximity}`]: isProximity,
            digged: digged || isProximity,
            disabled: disabled && !isProximity && !digged
        }
    );

    return (
        <div onClick={onClick} className={itemCss}>
            <div>
                <svg viewBox="0 0 56 1">
                    <text textAnchor="middle" x="28" y="13">
                        {proximity}
                    </text>
                </svg>
            </div>
        </div>

    );
};

Item.defaultProps = {
    digged: false,
    disabled: false,
}
