import {
    ADD_CART,
    REMOVE_CART,
    REMOVE_ITEM_CART,
    REMOVE_ALL_CART,
} from 'constants/index';

import { setCartLocalStorage, getCartLocalStorage } from 'utils/index';

export default (state = getCartLocalStorage(), action) => {
    const {type, payload} = action;

    switch (type) {
        case ADD_CART: {
            const { product, count } = payload;
            const id = state.findIndex(item => item.name === product.name);

            if (id === -1) {
                const newstate = state.concat({...product, count: 1});
                setCartLocalStorage(newstate);
                return newstate;
            }

            count ? state[id].count = count :state[id].count++;

            setCartLocalStorage([...state]);

            return [...state];
        }

        case REMOVE_CART: {
            const { product } = payload;
            const id = state.findIndex(item => item.name === product.name);

            state[id].count--;
            setCartLocalStorage([...state]);

            return [...state];
        }
        
        case REMOVE_ITEM_CART: {
            const { product } = payload;
            const id = state.findIndex(item => item.name === product.name);

            state.splice(id, 1);
            setCartLocalStorage([...state]);

            return [...state];
        }

        case REMOVE_ALL_CART:
            setCartLocalStorage([]);
            return [];
        default:
            return state;
    }
}