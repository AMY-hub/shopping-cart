import { createContext, useEffect, useState } from 'react';

import { CartFooter } from '../CartFooter';
import { CartHeader } from '../CartHeader';
import { Product } from '../Product';
import { Button } from '../Button';
import { serverPath } from '../../helpers/pathes';

export const cartContext = createContext(null);

export const Cart = () => {
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(null);
    const [fetchData, setFetchData] = useState(true);

    useEffect(() => {
        fetch(serverPath + 'products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                alert('Ошибка получения данных:' + err.message)
            })
    }, [fetchData]);

    useEffect(() => {
        if (products) {
            setTotal({
                count: products.reduce((prev, curr) => prev + curr.count, 0),
                price: products.reduce((prev, curr) => prev + curr.priceTotal, 0)
            })
        }
    }, [products]);

    const getProducts = () => {
        return products.map(product => <Product
            product={product}
            key={product.id}
        />)
    }

    const deleteProduct = (id) => {
        fetch(serverPath + 'products/' + id, { method: 'DELETE' })
            .then(response => {
                if (response.ok) setFetchData(fetchData => !fetchData);
            }).catch(err => {
                alert('Ошибка получения данных:' + err.message)
            })
    }

    const changeCount = (id, param) => {
        const product = products.find(product => product.id === id);

        const newCount = param === 'up' ?
            ++product.count
            : --product.count;

        const newPrice = newCount > 1 ?
            product.price * newCount
            : product.price;

        const data = {
            ...product,
            count: newCount < 1 ? 1 : newCount,
            priceTotal: newPrice
        }

        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) setFetchData(fetchData => !fetchData);
        }).catch(err => {
            alert('Ошибка получения данных:' + err.message)
        })

    }

    const changeValue = (id, value) => {
        const product = products.find(product => product.id === id);

        const newCount = value > 1 ? value : 1;

        const newPrice = newCount > 1 ?
            product.price * newCount
            : product.price;

        const data = {
            ...product,
            count: newCount,
            priceTotal: newPrice
        }

        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) setFetchData(fetchData => !fetchData);
        }).catch(err => {
            alert('Ошибка получения данных:' + err.message)
        })
    }

    //Just for testing:
    const addProduct = () => {
        const catalog = [
            {
                img: "ipad-mini.jpg",
                title: "iPad mini",
                count: 1,
                price: 29900,
                priceTotal: 29900
            },
            {
                img: "ipad-pro.jpg",
                title: "iPad pro",
                count: 1,
                price: 59900,
                priceTotal: 59900
            },
            {
                img: "iphone-12.jpg",
                title: "iPhone 12",
                count: 1,
                price: 69900,
                priceTotal: 69900
            },
            {
                img: "iphone-13.jpg",
                title: "iPhone 13 Pro",
                count: 1,
                price: 119900,
                priceTotal: 119900
            },
        ];
        const random = Math.floor(Math.random() * catalog.length);
        const data = catalog[random];

        fetch(serverPath + 'products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) setFetchData(fetchData => !fetchData);
        }).catch(err => {
            alert('Ошибка получения данных:' + err.message)
        })
    }

    return (
        <cartContext.Provider value={{ deleteProduct, changeCount, changeValue, addProduct }}>
            <section className="cart">
                <CartHeader />
                {products && getProducts()}
                {total && <CartFooter total={total} />}
            </section>
            <section className='addProduct'>
                <Button title={'Добавить товар'} />
            </section>
        </cartContext.Provider>
    )
}
