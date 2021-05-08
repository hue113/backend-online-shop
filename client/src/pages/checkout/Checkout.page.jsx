import React, { useState } from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/layout/Layout.component';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs.component';
import BillingDetails from './sub-component/BillingDetails.component';
import OrderSummary from './sub-component/OrderSummary.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { validateCard, toastSetting } from '../../utils/helper';
import { clearCart } from '../../redux/cart/cart.actions';

const Checkout = ({ currentUser, clearCart }) => {
  const [paymentDetails, setPaymentDetails] = useState();
  const history = useHistory();

  const handleSubmit = (cartItems) => {
    if (cartItems.length === 0) return toast.error(`Please add at least 1 item to cart.`);
    let result = validateCard(paymentDetails);
    if (!result) return;

    const items = cartItems.map((i) => ({
      product: i.item.id,
      color: i.order.color,
      size: i.order.size,
      quantity: i.order.quantity,
    }));

    const userOrder = {
      items,
      user: currentUser ? currentUser.id : '',
      phone: '4234234242',
      shippingAddress: {
        country: result.country,
        state: result.state,
        postal: result.postal,
        addressLine: result.addressLine,
      },
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/orders`, userOrder)
      .then((res) => {
        toast.success(
          'Your order has been created successfully! Thank you for shopping with us!',
          toastSetting,
        );
        window.setTimeout(() => {
          history.push('/');
        }, 2000);
        clearCart();
      })
      .catch((e) => {
        toast.error(`Sorry we couldn't proceed your order. Please try again.`);
      });
  };

  return (
    <div className="checkout">
      <MetaTags>
        <title>Shine | Checkout</title>
        <meta name="description" content="Shine Online Shop" />
      </MetaTags>

      <Layout>
        <Breadcrumbs path="home, checkout" />
        <div className="container">
          <div className="row"></div>
          <div className="row">
            <div className="col-md-6">
              <BillingDetails setPaymentDetails={setPaymentDetails} />
            </div>
            <div className="col-md-6">
              <OrderSummary handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
