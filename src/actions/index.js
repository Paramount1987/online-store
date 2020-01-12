import {
    REQUEST_PRODUCTS,
    REQUEST_SUCCESS_PRODUCTS,
    REQUEST_FAIL_PRODUCTS,
    ADD_CART,
    REMOVE_COUNT_CART,
    REMOVE_ITEM_CART,
    REMOVE_ALL_CART
} from 'constants/index';

export function requestProducts(dealers) {
    return {
        type: REQUEST_PRODUCTS,
        payload: {
            dealers
        }
    }
}

export function requestSuccesProducts(data) {
    return {
        type: REQUEST_SUCCESS_PRODUCTS,
        payload: {
            data
        }
    }
}

export function requestFailProducts() {
    return {
        type: REQUEST_FAIL_PRODUCTS,
        payload: {
            isLoading: false,
        }
    }
}

export function addToCart (product, count) {
    return {
        type: ADD_CART,
        payload: {
            product,
            count
        }
    }
}

export function removeCountFromCart (product) {
    return {
        type: REMOVE_COUNT_CART,
        payload: {
            product
        }
    }
}

export function removeAllCart (product) {
    return {
        type: REMOVE_ALL_CART,
        payload: {}
    }
}

export function removeItemFromCart (product) {
    return {
        type: REMOVE_ITEM_CART,
        payload: {
            product
        }
    }
}
