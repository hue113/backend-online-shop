import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Button from '../../../components/custom-button/Button.component';
import { renderRatingStars, toastSetting, calculatePrice } from '../../../utils/helper';
import { addItemToFavourite } from '../../../redux/favourite/favourite.actions';
import { addItemToCart } from '../../../redux/cart/cart.actions';

const ProductDetail = ({ product, addItemToFavourite, addItemToCart }) => {
  const { name, price, variation, rating, shortDescription, sku } = product;
  const [selectVariation, setVariation] = useState({
    color: variation ? variation[0].color : '',
    colorPrice: variation ? variation[0].price : '',
    colorDiscount: variation ? variation[0].discount : '',
  });
  const { color, colorPrice, colorDiscount } = selectVariation;
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);

  const handleSelectColor = (color) => {
    const chosenvariation = variation.find((i) => i.color === color);
    setVariation({
      color: color,
      colorPrice: chosenvariation.price,
      colorDiscount: chosenvariation.discount,
    });
  };

  const handleSelectSize = (size, i) => {
    // fixed Safari issue: not changing style on click
    const sizeBtn = document.querySelectorAll('.sizebtn');
    sizeBtn.forEach((btn) => {
      btn.classList.remove('focus');
    });
    const selectedSize = document.querySelector(`.box.sizebtn.s${size}`);
    selectedSize.classList.add('focus');

    setSize(size);
  };
  const handleSubmit = (color, colorPrice, colorDiscount, size, quantity) => {
    if (!color || !size || !quantity) {
      toast.error('Please choose color & size', toastSetting);
    } else {
      const order = { color, colorPrice, colorDiscount, size, quantity };
      addItemToCart(product, order);

      // reset color, size, quantity after submission
      const sizeBtn = document.querySelectorAll('.sizebtn');
      sizeBtn.forEach((btn) => {
        btn.classList.remove('focus');
      });
      setQuantity(1);
      setSize(null);

      toast.success(
        `You've just added ${quantity} ${name} - Size: ${size.toUpperCase()} & Color: ${color} successfully !`,
        toastSetting,
      );
    }
  };

  return (
    <div>
      <div className="star">{renderRatingStars(rating)}</div>
      <Link to={`/products/${name.toLowerCase().replace(/ /g, '-')}.${sku}`}>
        <h3 className="title mt-3">{name}</h3>
      </Link>
      <div className="price my-4">
        {colorDiscount === 0 ? (
          <span className="mr-5">${colorPrice.toFixed(2)}</span>
        ) : (
          <div>
            <span className="mr-4 old-price">${colorPrice.toFixed(2)}</span>
            <span className="sale-price">${calculatePrice(price, colorDiscount)}</span>
          </div>
        )}
      </div>
      <p className="description pb-1">{shortDescription}</p>

      {/*  */}
      <div className="options d-flex pt-2">
        <div className="colorPick mr-5">
          <h5>Color</h5>
          <div className="color-btn color d-flex py-3">
            <DropdownButton title={color} onSelect={handleSelectColor}>
              {variation.map((el, index) => (
                <Dropdown.Item key={index} eventKey={el.color}>
                  {el.color}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>
        <div className="sizePick ml-4">
          <h5>Size</h5>
          <div className="size-content d-flex my-4 w-100">
            {variation
              .filter((el) => el.color === color)[0]
              .size.map((el, index) =>
                el.stock === 0 ? (
                  <div key={index} className={`outOfStock mr-3 `}>
                    <div className="text d-flex justify-content-center align-items-center">
                      {el.name.toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <button
                    key={index}
                    className={`box sizebtn s${el.name} mr-3 d-flex justify-content-center align-items-center`}
                    onClick={() => handleSelectSize(el.name, index)}
                  >
                    {el.name.toUpperCase()}
                  </button>
                ),
              )}
          </div>
        </div>
      </div>

      <div className="quantity pt-1 d-flex align-items-center">
        <h5 className="mr-5 my-0">Quantity</h5>
        <div className="quantity-btn">
          <input
            className="py-3 text-center"
            type="number"
            pattern="[0-9]*"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          ></input>
        </div>
      </div>

      <div className="py-5">
        <Button
          styleClass="color square lighter mx-4"
          name="Add To Cart"
          onClick={() => handleSubmit(color, colorPrice, colorDiscount, size, quantity)}
        />
        <Button
          onClick={() => addItemToFavourite(product)}
          styleClass="color square lighter mx-4"
        >
          <i className="bi bi-heart" />
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToFavourite: (item) => dispatch(addItemToFavourite(item)),
  addItemToCart: (item, order) => dispatch(addItemToCart(item, order)),
});

export default connect(null, mapDispatchToProps)(ProductDetail);
