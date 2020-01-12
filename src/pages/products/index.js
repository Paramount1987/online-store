import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestProducts, addToCart } from 'actions/index';

import CardDefault from 'components/cards/cardDefault';
import Loader from 'components/loader';
import Button from 'components/button';

const ProductsPage = ({products, dealers, isLoading, requestProducts, addToCart}) => {

    useEffect(() => {
       requestProducts(dealers);
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col" s={12}>
                    <h1>Товары</h1>
                </div>
            </div>

            <div className="row">
                {
                    !isLoading ?
                        products.map((card, i) => {
                            return (
                                <div
                                    key={i} // TODO: get id product from backend
                                    className="col s12 m6 l4 mb-3"
                                >
                                    <CardDefault product={card}>
                                        <Button
                                            clickHandler={() => addToCart(card)}
                                        >
                                            <i className="material-icons left">add_shopping_cart</i>
                                                в корзину
                                            <span> ₽ {card.price}</span>
                                        </Button>
                                    </CardDefault>
                                </div>
                            )
                        })
                        : <Loader />
                }
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.data,
        dealers: state.dealers,
        isLoading: state.products.isLoading
    }
}

const mapDispatchToProps = {
    requestProducts,
    addToCart
}

ProductsPage.propTypes = {
    dealers: PropTypes.array,
    products: PropTypes.array.isRequired,
    requestProducts: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
