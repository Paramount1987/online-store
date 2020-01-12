import React from 'react';
import PropTypes from 'prop-types';

const Button = ({children, className, clickHandler}) => {

    return (
        <button
            type="button"
            className={`btn waves-effect waves-light ${className}`}
            onClick={clickHandler}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    clickHandler: PropTypes.func,
}

export default Button;