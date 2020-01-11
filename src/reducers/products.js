import {
    REQUEST_PRODUCTS,
    REQUEST_SUCCESS_PRODUCTS,
    REQUEST_FAIL_PRODUCTS,
} from 'constants/index';

const initialState = {
    isLoading: false,
    data: []
}

export default (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case REQUEST_PRODUCTS:
            return {
                ...state,
                isLoading: true
            };
        case REQUEST_SUCCESS_PRODUCTS:
            return {
                ...state,
                data: payload.data,
                isLoading: false
            };
        case REQUEST_FAIL_PRODUCTS:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}