import { ButtonDel } from '../ButtonDel/ButtonDel';
import { Count } from '../Count';
import formatPrice from '../../utils/priceFormatter';

import './style.scss';

export const Product = ({ product }) => {
    const { id, img, title, count, priceTotal } = product;

    return (
        <section className="product">
            <div className="product__img"><img src={`./img/products/${img}`} alt={title} /></div>
            <div className="product__title">{title}</div>
            <div className="product__count">
                <Count id={id} count={count} />
            </div>
            <div className="product__price">{`${formatPrice(priceTotal)} руб.`}</div>
            <div className="product__controls">
                <ButtonDel id={id} />
            </div>
        </section>
    )
}
