import { useContext } from 'react';
import { cartContext } from '../Cart';

import './style.scss';

export const Button = ({ title }) => {
    const { addProduct } = useContext(cartContext);
    return (
        <button className='btn' onClick={addProduct}>{title}</button>
    )
}
