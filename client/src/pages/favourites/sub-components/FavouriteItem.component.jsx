import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Button from '../../../components/custom-button/Button.component';
import { addItemToCart } from '../../../redux/cart/cart.actions';
import { calculatePrice, toastSetting } from '../../../utils/helper';

import { removeItemFromFavourite } from '../../../redux/favourite/favourite.actions';

const FavouriteItem = ({ product, removeItemFromFavourite, addItemToCart }) => {
  const { name, image, sku, isNewItem, variation } = product;
  const [selectVariation, setVariation] = useState({
    color: variation ? variation[0].color : '',
    colorPrice: variation ? variation[0].price : '',
    colorDiscount: variation ? variation[0].discount : '',
  });
  const { color, colorPrice, colorDiscount } = selectVariation;
  const [size, setSize] = useState('');
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
    setSize(size);
  };

  const handleSubmit = (color, colorPrice, colorDiscount, size, quantity) => {
    if (!color || !size || !quantity) {
      toast.error('Please choose color & size', toastSetting);
    } else {
      const order = { color, colorPrice, colorDiscount, size, quantity };
      addItemToCart(product, order);
      toast.success(
        `You've just added ${quantity} ${name} - Size: ${size.toUpperCase()} & Color: ${color} successfully !`,
        toastSetting,
      );

      // reset color, size, quantity after submission
      const sizeBtn = document.querySelectorAll('.sizebtn');
      sizeBtn.forEach((btn) => {
        btn.classList.remove('focus');
      });
      setQuantity(1);
    }
  };

  return (
    <div className="favourites-item d-flex flex-column flex-lg-row justify-content-center align-items-center px-4 py-5">
      <div className="image-box p-3 d-flex flex-column justify-content-center align-items-center">
        <Link to={`/products/${name.toLowerCase().replace(/ /g, '-')}.${sku}`}>
          <img src={image} alt={name} />
        </Link>
        {isNewItem && <div className="special new p-3">New</div>}
        {colorDiscount !== 0 && <div className="special sale p-3">-{colorDiscount}%</div>}
        <div className="my-3">
          <Button
            name="Add To Cart"
            styleClass="square color lighter"
            onClick={() => handleSubmit(color, colorPrice, colorDiscount, size, quantity)}
          />
        </div>
      </div>

      <div className="content px-4 py-3 flex-grow-1 d-flex flex-column align-self-lg-start">
        <h4 className="bold mb-3 pr-4 mr-5">{name}</h4>
        <i
          className="bi bi-trash remove-icon py-3 px-5"
          onClick={() => removeItemFromFavourite(product)}
        />
        <div className="price mb-4">
          {colorDiscount === 0 ? (
            <span className="mr-4">${colorPrice.toFixed(2)}</span>
          ) : (
            <div>
              <span className="mr-4 old-price">${colorPrice.toFixed(2)}</span>
              <span className="sale-price">
                ${calculatePrice(colorPrice, colorDiscount)}
              </span>
            </div>
          )}
        </div>
        <div className="options d-flex flex-column">
          <div className="colorPick mr-5">
            <h5 className="mb-0">Color</h5>
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
          <div className="sizePick mb-4">
            <h5 className="mb-3">Size</h5>
            <div className="size-btn d-flex w-100">
              <DropdownButton title={size.toUpperCase()} onSelect={handleSelectSize}>
                {variation &&
                  variation
                    .filter((el) => el.color === color)[0]
                    .size.map((el, index) =>
                      el.stock === 0 ? (
                        <Dropdown.Item key={index} eventKey={el.name} disabled={true}>
                          {el.name.toUpperCase()} - out of stock
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item key={index} eventKey={el.name}>
                          {el.name.toUpperCase()}
                        </Dropdown.Item>
                      ),
                    )}
              </DropdownButton>
            </div>
          </div>
        </div>

        <div className="quantity my-3 d-flex align-items-center">
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
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItemFromFavourite: (item) => dispatch(removeItemFromFavourite(item)),
  addItemToCart: (item, order) => dispatch(addItemToCart(item, order)),
});
export default connect(null, mapDispatchToProps)(FavouriteItem);
