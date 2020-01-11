import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    addToCart,
    removeFromCart,
    removeItemFromCart,
    removeAllCart
} from 'actions/index';

import CardDefault from 'components/cards/cardDefault';

const Cart = ({ products, addToCart, removeFromCart, removeItemFromCart, removeAllCart }) => {
    const [price, setPrice] = useState(0);

    const clickRemoveHandler = (product) => {
        if (product.count > 1) {
            removeFromCart(product);
        }
    }

    const clickRemoveAllHandler = () => {
        removeAllCart()
    }

    const changeCountHandler = (e, product) => {
        const parsedValue = parseInt(e.target.value);

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
                    <button
                        type="button"
                        className="col waves-effect waves-light btn-floating red py-0"
                        onClick={() => clickRemoveHandler(product)}
                    >
                    <i className="material-icons">remove</i>
                    </button>
                    <div className="col s6 py-10">
                        <input
                            type="text"
                            onChange={(e) => changeCountHandler(e, product)}
                            value={count}
                        />
                    </div>

                    <button 
                        type="button"
                        className="col waves-effect waves-light btn-floating green py-0"
                        onClick={() => addToCart(product)}
                    >
                        <i className="material-icons">add</i>
                    </button>
                </div>
                <button 
                    type="button"
                    className="btn waves-effect waves-light"
                    onClick={() => removeItemFromCart(product)}
                >
                        <i className="material-icons left">delete_forever</i>
                        Удалить
                </button>
            </React.Fragment>
        )
    }

    useEffect(() => {
        const sum = products.reduce((acc,{price, count}) => {
            return acc += price * count;
        }, 0);

        setPrice(sum.toFixed(2));
    }, [products])

    return (
        <div className="container">
            {
                products.length ?
                <div>
                    <h2>Товары в вашей корзине</h2>
                    <h4>
                        Общая стоимость товаров: ₽ {price.toString()}
                    </h4>
                    <button 
                        type="button"
                        className="btn mb-3"
                        onClick={clickRemoveAllHandler}
                    >
                        <i className="material-icons left">delete_forever</i>
                        Удалить все товары
                    </button>
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
    removeFromCart,
    removeItemFromCart,
    removeAllCart
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    removeItemFromCart: PropTypes.func.isRequired,
    removeAllCart: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
