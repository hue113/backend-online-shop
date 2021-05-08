import { toast } from 'react-toastify';
import validator from 'validator';

export const validateEmptyField = (object, errorMessage, toastSetting) => {
  const isEmpty = Object.values(object).some((x) => x === null || x === '');
  if (isEmpty) {
    toast.error(errorMessage, toastSetting);
    return false;
  }
  return object;
};

export const validateName = (name, toastSetting) => {
  if (!/^[a-zA-Z _]*$/.test(name)) {
    // if (!validator.isAlpha(name)) {
    toast.error('Name must contains letters only.', toastSetting);
    return false;
  }
  return name;
};

export const validateCardNumber = (cardNumber, toastSetting) => {
  if (!validator.isCreditCard(cardNumber)) {
    toast.error('Card Number is not valid.', toastSetting);
    return false;
  }
  return cardNumber;
};

export const validateMMYY = (mmyy, toastSetting) => {
  const formattedMMYY = mmyy.replace(/[-/ ]/g, '');
  const condition = /^(?:0[1-9]|1[0-2])(\d{2})$/;
  const match = formattedMMYY.match(condition);
  if (!match) {
    toast.error(
      'MMYY is not valid. It should be a VALID DATE & in the following format: MMYY or MM-YY or MM/YY.',
      toastSetting,
    );
    return false;
  }
  return formattedMMYY;
};

export const validateCVV = (cvv, toastSetting) => {
  if (!validator.isHexadecimal(cvv) || cvv.length !== 3) {
    toast.error(
      'CVV is not valid. CVV must contains only numbers & length equals 3.',
      toastSetting,
    );
    return false;
  }
  return cvv;
};

export const validatePostal = (postal, toastSetting) => {
  const formattedPostal = postal.replace(/[- ]/g, '');
  if (formattedPostal.length !== 6 || !validator.isAlphanumeric(formattedPostal)) {
    toast.error(
      'Postal code is not valid. It must contain 6 letters and numbers only in following formats: ABC000 or ABC-000 or ABC 000',
      toastSetting,
    );
    return false;
  }
  return formattedPostal;
};

export const validateEmail = (email, toastSetting) => {
  if (!validator.isEmail(email)) {
    toast.error('Email is not valid', toastSetting);
    return false;
  }
  return email;
};
