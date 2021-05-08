import React from 'react';

import { calculatePrice } from '../../../utils/helper';

const OrderItemCard = ({ product, order }) => {
  const { size, color, colorPrice, colorDiscount, quantity } = order;

  return (
    <div className="line row">
      <div className="col-7">
        <span>
          {product.name} × {quantity}
        </span>
        <br />
        <span>
          Color: {color}
          <span className="px-3">-</span>
          Size: {size.toUpperCase()}
        </span>
      </div>
      <span className="col-5 text-center">
        ${calculatePrice(colorPrice, colorDiscount, quantity)}
      </span>
    </div>
  );
};
export default OrderItemCard;
