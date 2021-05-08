import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopDropdown from './ShopDropdown.component';

const MobileMenu = ({ toggleMobile, setToggleMobile }) => {
  const [toggleShop, setToggleShop] = useState(false);

  return (
    <div className="mobile-menu">
      <div className="gap-fill"></div>
      <div className="mobile-menu-inner">
        <div className="mobile-item" onClick={() => setToggleMobile(!toggleMobile)}>
          <Link to="/">Home</Link>
        </div>
        <div
          className="mobile-item shop-wrapper"
          onClick={() => setToggleShop(!toggleShop)}
        >
          <span className="shop">Shop</span>
          {toggleShop ? <ShopDropdown /> : ''}
        </div>
        <div className="mobile-item" onClick={() => setToggleMobile(!toggleMobile)}>
          <Link className="" to="/shop/new-arrivals">
            New Arrivals
          </Link>
        </div>
        <div className="mobile-item" onClick={() => setToggleMobile(!toggleMobile)}>
          <Link className="" to="/shop/sale">
            Hot Sale
          </Link>
        </div>
        <div className="mobile-item" onClick={() => setToggleMobile(!toggleMobile)}>
          <Link className="" to="/stores">
            Store Locator
          </Link>
        </div>
      </div>
      <div className="invisible">A</div>
    </div>
  );
};

export default MobileMenu;
