export const setCartLocalStorage = (cartState) => {
    localStorage.setItem('cart', JSON.stringify(cartState));
}

export const getCartLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

