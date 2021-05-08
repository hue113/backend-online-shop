import { toast } from 'react-toastify';

import {
  validateEmptyField,
  validateName,
  validateCVV,
  validateCardNumber,
  validateMMYY,
  validatePostal,
  validateEmail,
} from './validators';

export const shuffleArray = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const renderRatingStars = (rating) => {
  return [...Array(5)].map((el, i) =>
    // check if current star should be half
    i < rating && i + 1 > rating ? (
      <i key={i} className="bi bi-star-half icon" />
    ) : // not half, so check if current star should be full
    i < rating ? (
      <i key={i} className="bi bi-star-fill icon" />
    ) : (
      // else, current star should be empty
      <i key={i} className="bi bi-star icon" />
    ),
  );
};

export const formatPostal = (string) => {
  return (string.slice(0, 3) + ' ' + string.slice(3)).toUpperCase();
};

export const capitalizeFirstLetterEachWord = (string) => {
  const words = string.replace('-', ' ').split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  words.join(' ');
  return words;
};

export const toastSetting = {
  position: toast.POSITION.TOP_CENTER,
  draggable: true,
};
export const toastSetting2 = {
  position: toast.POSITION.TOP_RIGHT,
  draggable: true,
};

// export const toastTopCenter = (type, message) => {
//   switch (type) {
//     case 'error':
//       toast.error(message, { position: toast.POSITION.TOP_CENTER });
//       break;
//     case 'success':
//       toast.success(message, { position: toast.POSITION.TOP_CENTER });
//       break;
//     default:
//       break;
//   }
// };

/**
 * This method calculate product price/order price based on orginal price (required), discount (required) & quantity (if yes)
 * @returns price after calculation
 */
export const calculatePrice = (price, discount, quantity) => {
  if (quantity) {
    const ItemOrderPrice = (quantity * price * (100 - discount)) / 100;
    return ItemOrderPrice.toFixed(2);
  } else return ((price * (100 - discount)) / 100).toFixed(2);
};

export const addItemToFavourite = (existingItems, itemToAdd) => {
  const existingListItem = existingItems.find((item) => item.id === itemToAdd.id);
  if (existingListItem) {
    toast.warn('Item already exists in your favourite list', toastSetting);
    return existingItems;
  }
  toast('Item was successfully added to Favourites !', toastSetting);
  return [...existingItems, itemToAdd];
};

export const removeItemFromFavourite = (existingItems, itemToRemove) => {
  console.log(existingItems);
  console.log(itemToRemove);
  return existingItems.filter((item) => item.id !== itemToRemove.id);
};

export const addItemToCart = (existingItems, itemToAdd, orderToAdd) => {
  // CHECK IF PRODUCT WITH SAME COMBINATION OF COLOR/SIZE ALREADY EXISTS IN CART
  let product = existingItems.find(
    (cartItem) =>
      cartItem.item.id === itemToAdd.id &&
      cartItem.order.color === orderToAdd.color &&
      cartItem.order.size === orderToAdd.size,
  );

  // 1. IF EXIST --> increase quantity
  if (product) {
    product.order.quantity += orderToAdd.quantity;

    // update that product & order
    const newCartList = existingItems.map((cartItem) =>
      cartItem.item.id === itemToAdd.id &&
      cartItem.order.color === orderToAdd.color &&
      cartItem.order.size === orderToAdd.size
        ? product
        : cartItem,
    );
    return newCartList;
  }

  // 2. IF NOT EXIST --> add new
  return [...existingItems, { item: itemToAdd, order: orderToAdd }];
};

export const removeItemOrderFromCart = (existingItems, itemToRemove, orderToDelete) => {
  toast.warn('Order was removed successfully', toastSetting);
  return existingItems.filter((cartItem) =>
    cartItem.item.id === itemToRemove.id &&
    cartItem.order.color === orderToDelete.color &&
    cartItem.order.size === orderToDelete.size
      ? ''
      : cartItem,
  );
};

export const decreaseQuantity = (existingItems, itemToDecrease, orderToDecrease) => {
  let product = existingItems.find(
    (cartItem) =>
      cartItem.item.id === itemToDecrease.id &&
      cartItem.order.color === orderToDecrease.color &&
      cartItem.order.size === orderToDecrease.size,
  );

  // 1. If that product has quantity=1 -> remove that product from cart
  if (orderToDecrease.quantity === 1) {
    return existingItems.filter((cartItem) =>
      cartItem.item.id === itemToDecrease.id &&
      cartItem.order.color === orderToDecrease.color &&
      cartItem.order.size === orderToDecrease.size
        ? ''
        : cartItem,
    );
  }

  // 2. other case -> decrease quantity
  product.order.quantity -= 1;
  return existingItems.filter((cartItem) =>
    cartItem.item.id === itemToDecrease.id &&
    cartItem.order.color === orderToDecrease.color &&
    cartItem.order.size === orderToDecrease.size
      ? product
      : cartItem,
  );
};

export const increaseQuantity = (existingItems, itemToIncrease, orderToIncrease) => {
  let product = existingItems.find(
    (cartItem) =>
      cartItem.item.id === itemToIncrease.id &&
      cartItem.order.color === orderToIncrease.color &&
      cartItem.order.size === orderToIncrease.size,
  );

  product.order.quantity += 1;

  return existingItems.filter((cartItem) =>
    cartItem.item.id === itemToIncrease.id &&
    cartItem.order.color === orderToIncrease.color &&
    cartItem.order.size === orderToIncrease.size
      ? product
      : cartItem,
  );
};

export const sortFilterProducts = (sortFilterOption, categoryProducts) => {
  let copyProducts = [...categoryProducts];
  let result;
  switch (sortFilterOption) {
    case 'popular':
      copyProducts.sort((a, b) => b.saleCount - a.saleCount);
      result = copyProducts;
      break;
    case 'price-lth':
      copyProducts.sort(
        (a, b) =>
          a.price * (100 - a.variation[0].discount) -
          b.price * (100 - b.variation[0].discount),
      );
      result = copyProducts;
      break;
    case 'price-htl':
      copyProducts.sort(
        (a, b) =>
          b.price * (100 - b.variation[0].discount) -
          a.price * (100 - a.variation[0].discount),
      );
      result = copyProducts;
      break;

    case '0-20':
    case '21-50':
    case '51-100':
    case '101-above':
      let range = sortFilterOption.split('-');
      if (isNaN(range[1] * 1)) {
        result = copyProducts.filter(
          (p) => calculatePrice(p.price, p.variation[0].discount) * 1 > range[0] * 1,
        );
      } else {
        result = copyProducts.filter(
          (p) =>
            calculatePrice(p.price, p.variation[0].discount) * 1 > range[0] * 1 &&
            calculatePrice(p.price, p.variation[0].discount) * 1 < range[1] * 1,
        );
      }
      break;

    case 'red':
    case 'blue':
    case 'yellow':
    case 'pink':
    case 'white':
    case 'brown':
    case 'green':
    case 'orange':
    case 'black':
    case 'purple':
      result = categoryProducts.filter((p) => {
        return p.variation.find((i) => i.color === sortFilterOption) ? p : '';
      });
      break;

    default:
      result = categoryProducts;
      break;
  }
  return result;
};

export const getSortFilterName = (sortFilterOption) => {
  switch (sortFilterOption) {
    case 'popular':
      return 'Sort by Popularity';
    case 'price-lth':
      return 'Sort by price: Low To High';
    case 'price-htl':
      return 'Sort: Price High To Low';
    case '0-20':
    case '21-50':
    case '51-100':
    case '101-above':
      let range = sortFilterOption.split('-');
      if (isNaN(range[1] * 1)) {
        return `Filter: Price above $${range[0]}`;
      } else {
        return `Filter: Price between $${range[0]} and $${range[1]}`;
      }
    case 'red':
    case 'blue':
    case 'yellow':
    case 'pink':
    case 'white':
    case 'brown':
    case 'green':
    case 'orange':
    case 'black':
    case 'purple':
      return `Sort by color: ${sortFilterOption}`;
    default:
      break;
  }
};

export const validateNameEmail = (name, email) => {
  if (!validateName(name, toastSetting2)) return false;
  if (!validateEmail(email, toastSetting2)) return false;

  const formattedResult = {
    name: validateName(name),
    email: validateEmail(email),
  };
  return formattedResult;
};

export const validateSettings = (name, email, postal) => {
  if (!validateName(name, toastSetting2)) return false;
  if (!validateEmail(email, toastSetting2)) return false;
  if (postal.length !== 0) {
    if (!validatePostal(postal, toastSetting)) return false;
  }

  const formattedResult = {
    name: validateName(name),
    email: validateEmail(email),
    postal: postal.length === 0 ? postal : validatePostal(postal),
  };
  return formattedResult;
};

export const validateCard = (paymentDetails) => {
  const { name, cardNumber, mmyy, cvv, postal } = paymentDetails;

  if (
    !validateEmptyField(
      paymentDetails,
      'All fields in billing details and address must be selected or filled.',
      toastSetting,
    )
  )
    return false;
  if (!validateName(name, toastSetting)) return false;
  if (!validateCardNumber(cardNumber, toastSetting)) return false;
  if (!validateMMYY(mmyy, toastSetting)) return false;
  if (!validateCVV(cvv, toastSetting)) return false;
  if (!validatePostal(postal, toastSetting)) return false;

  const formattedPaymentDetails = {
    name: validateName(name),
    cardNumber: validateCardNumber(cardNumber),
    mmyy: validateMMYY(mmyy),
    cvv: validateCVV(cvv),
    addressLine: paymentDetails.addressLine,
    postal: validatePostal(postal),
    country: paymentDetails.country,
    state: paymentDetails.state,
  };
  return formattedPaymentDetails;
};

export const validatePasswords = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    toast.error("Passwords don't match, please try again", toastSetting2);
    return false;
  }
  if (password.length < 8 || passwordConfirm.length < 8) {
    toast.error('Password: Be 8 or more characters long', toastSetting2);
    return false;
  }

  return { password, passwordConfirm };
};
