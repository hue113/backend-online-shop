import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ item }) => {
  const product = item.product;

  return (
    <>
      {product && (
        <div className="item my-4 d-md-flex">
          <Link
            to={`/products/${product.name.toLowerCase().replace(/ /g, '-')}.${
              product.sku
            }`}
          >
            <div className="image mr-5">
              <img src={product.image[0]} alt={product.name} />
            </div>
          </Link>
          <div className="">
            <h5 className="bold my-3">{product.name}</h5>
            <div className="description">
              <span className="mr-2">Color:</span>
              <span className="mr-5">{item.color}</span>
              <span className="mr-2">Size:</span>
              <span className="mr-5">{item.size.toUpperCase()}</span>
              <span className="mr-2">Quantity:</span>
              <span className="">{item.quantity}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItem;
