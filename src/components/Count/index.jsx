import { useContext } from 'react';
import { cartContext } from '../Cart';

import './style.scss';

export const Count = ({ id, count }) => {
    const { changeCount, changeValue } = useContext(cartContext);

    return (
        <div className="count">
            <div className="count__box">
                <input type="number" className="count__input" min="1" max="100"
                    value={count}
                    onChange={(e) => changeValue(id, parseInt(e.target.value))} />
            </div>
            <div className="count__controls">
                <button type="button" className="count__up"
                    onClick={() => changeCount(id, 'up')}>
                    <img src="./img/icons/icon-up.svg" alt="Increase" />
                </button>
                <button type="button" className="count__down"
                    onClick={() => changeCount(id, 'down')}>
                    <img src="./img/icons/icon-down.svg" alt="Decrease" />
                </button>
            </div>
        </div>
    )
}
