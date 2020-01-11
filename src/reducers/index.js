import {combineReducers} from 'redux';

import products from './products';
import cart from './cart';
import dealers from './dealers';

export default combineReducers({
    products,
    cart,
    dealers
});