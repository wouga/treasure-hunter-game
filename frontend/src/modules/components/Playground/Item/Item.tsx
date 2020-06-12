import React from 'react';
import classNames from 'classnames';

import './Item.scss';

export interface IItem {
    proximity?: number | string
}

export const Item: React.FC<IItem> = ({ proximity }) => {

    const itemCss = classNames("item", {
        ["proximity-1"]: proximity === 1,
        ["proximity-2"]: proximity === 2,
        ["proximity-3"]: proximity === 3,
        ["proximity-T"]: proximity === "T",
    });

    return (
        <div className={itemCss}>
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
