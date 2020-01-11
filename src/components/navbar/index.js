import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Navbar = ({cart}) => {
    const [countCart, setCountCart] = useState(0);

    useEffect(() => {
      let sum = 0;

      cart.forEach(el => sum += el.count);
      setCountCart(sum);
    }, [cart]);

    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <ul className="right">
              <li><NavLink to="/products">Товары</NavLink></li>
              <li>
                <NavLink to="/cart">
                  Корзина {countCart || null}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
}

Navbar.propTypes = {
  cart: PropTypes.array.isRequired
}

export default Navbar;
