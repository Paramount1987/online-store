import React from 'react';
import PropTypes from 'prop-types';

import API from 'api/index';

const CardDefault = ({product, children}) => {
    return (
        <div className="card px-20">
            <div
                style={{
                    backgroundImage: `url(${API.URL}${product.image})`,
                }}
                className="bg-img"
            />
            <h4>{product.name}</h4>
            {children}
        </div>
    )
}

CardDefault.propTypes = {
    product: PropTypes.object.isRequired,
    children: PropTypes.node
}

export default CardDefault;
