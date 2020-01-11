import {combineReducers} from 'redux';

import products from './products';
import cart from './cart';
import dealers from './cart';

export default combineReducers({
    products,
    cart,
    dealers
});