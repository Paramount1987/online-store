import {
    ADD_CART,
    REMOVE_COUNT_CART,
    REMOVE_ITEM_CART,
    REMOVE_ALL_CART,
} from 'constants/index';

import { getCartLocalStorage } from 'utils/index';

export default (state = getCartLocalStorage(), action) => {
    const {type, payload} = action;

    switch (type) {
        case ADD_CART: {
            const { product, count } = payload;
            const id = state.findIndex(item => item.name === product.name);

            if (id === -1) {
                const newstate = [...state, {...product, count: 1}];

                return newstate;
            }

            count ?
                state[id].count = count
                : state[id].count++;

            return [...state];
        }

        case REMOVE_COUNT_CART: {
            const { product } = payload;

            state.find(item => item.name === product.name).count--;

            return [...state];
        }
        
        case REMOVE_ITEM_CART: {
            const { product } = payload;
            const id = state.findIndex(item => item.name === product.name);

            state.splice(id, 1);

            return [...state];
        }

        case REMOVE_ALL_CART:
            return [];
        default:
            return state;
    }
}