import React, { useEffect, useState } from 'react';
import { Fade } from '@material-ui/core';

import { setVar } from '../../../libs/css-vars';

import './Playground.scss';
import { Item } from './Item/Item';

export const Playground = () => {
    const fadeTimeout = 1e3;
    const [showPlayground, setShowPlayground] = useState(false);
    const gridSize = 5;
    useEffect(() => {
        setVar('grid-size', gridSize.toString());
        setShowPlayground(true);
    })

    return (
        <Fade in={showPlayground} timeout={fadeTimeout}>
            <div className="playground">
                <div className="grid">
                    {[...Array(gridSize)]
                        .map((_, idy) => [...Array(gridSize)]
                            .map((_, idx) => (
                                <Item key={idx + idy} proximity={idx * idy % 5} />
                            )))}

                </div>
            </div>
        </Fade>
    );
}
