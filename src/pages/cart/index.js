import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    addToCart,
    removeCountFromCart,
    removeItemFromCart,
    removeAllCart
} from 'actions/index';

import CardDefault from 'components/cards/cardDefault';
import Button from 'components/button';

import { setCartLocalStorage } from 'utils/index';

const Cart = ({ products, addToCart, removeCountFromCart, removeItemFromCart, removeAllCart }) => {
    const [price, setPrice] = useState(0);

    const clickRemoveHandler = (product) => {
        if (product.count > 1) {
            removeCountFromCart(product);
        }
    }

    const clickRemoveAllHandler = () => {
        removeAllCart()
    }

    const changeCountHandler = (e, product) => {
        const parsedValue = parseInt(e.target.value, 10);

        if (!isNaN(parsedValue) && ( parsedValue > 0)) {
            addToCart(product, parsedValue);
        }
    }

    const renderCardChildren = (product) => {
        const { count, price } = product;
        return (
            <React.Fragment>
                <h5>Цена: ₽ {+(count * price).toFixed(2).toString()}</h5>

                <div className="row">
                    <Button
                        className="col btn-floating red py-0"
                        clickHandler={() => clickRemoveHandler(product)}
                    >
                        <i className="material-icons">remove</i>
                    </Button>

                    <div className="col s6 py-10">
                        <input
                            type="text"
                            onChange={(e) => changeCountHandler(e, product)}
                            value={count}
                        />
                    </div>

                    <Button
                        className="col btn-floating green py-0"
                        clickHandler={() => addToCart(product)}
                    >
                        <i className="material-icons">add</i>
                    </Button>
                </div>
                <Button
                    clickHandler={() => removeItemFromCart(product)}
                >
                    <i className="material-icons left">delete_forever</i>
                    Удалить
                </Button>
            </React.Fragment>
        )
    }

    useEffect(() => {
        const sum = products.reduce((acc,{price, count}) => {
            return acc + (price * count);
        }, 0);

        setPrice(+sum.toFixed(2));
    }, [products])

    useEffect(() => {
        setCartLocalStorage(products);
    }, [products])

    return (
        <div className="container">
            {
                products.length ?
                <div>
                    <h2>Товары в вашей корзине</h2>
                    <h4>
                        {/* toString removes zero */}
                        Общая стоимость товаров: ₽ {price.toString()}
                    </h4>
                    <Button
                        className="mb-3"
                        clickHandler={clickRemoveAllHandler}
                    >
                        <i className="material-icons left">delete_forever</i>
                        Удалить все товары
                    </Button>
                    <div className="row">
                        {
                            products.map((product, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="col s12 m6 l4"
                                    >
                                        <CardDefault
                                            product={product}
                                        >
                                            {renderCardChildren(product)}
                                        </CardDefault>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                : <h2>Ваша корзина пуста</h2>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.cart
    }
}

const mapDispatchToProps = {
    addToCart,
    removeCountFromCart,
    removeItemFromCart,
    removeAllCart
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeCountFromCart: PropTypes.func.isRequired,
    removeItemFromCart: PropTypes.func.isRequired,
    removeAllCart: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
