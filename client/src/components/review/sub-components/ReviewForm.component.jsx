import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';

import Button from '../../custom-button/Button.component';
import CustomForm from '../../form/CustomForm.component';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { toastSetting } from '../../../utils/helper';

const ReviewForm = ({ productId, currentUser, onCreate }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    if (!currentUser) return toast.error('Please log in to leave a review', toastSetting);
    if (review.length === 0) return toast.error('Review cannot be empty!', toastSetting);

    const reviewForm = {
      review,
      rating,
      product: productId,
      user: currentUser.id,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/reviews`, reviewForm)
      .then((res) => {
        toast('Thank you for your feedback!', toastSetting);
        settings.value = 0;
        setReview('');
        onCreate();
      })
      .catch((e) => {
        toast.error(
          'You can only leave one review for a product. Do you want to edit your review instead?',
          toastSetting,
        );
      });
  };

  useEffect(() => {
    return () => {};
  }, [productId, rating]);

  const settings = {
    size: 15,
    count: 5,
    color: '#ffc106',
    activeColor: '#ffc106',
    value: rating,
    isHalf: true,
    emptyIcon: <i className="bi bi-star icon" />,
    halfIcon: <i className="bi bi-star-half icon" />,
    filledIcon: <i className="bi bi-star-fill icon" />,
    onChange: (newRating) => setRating(newRating),
  };

  return (
    <div className="review-form mt-5 p-5 mx-auto">
      <form>
        <h4 className="mb- bold">Add A Review</h4>
        <div className="pt-3 d-flex">
          <span className="mr-3">Rate It:</span>

          <ReactStars {...settings} />
        </div>
        <CustomForm
          type="text"
          onChange={handleChange}
          value={review}
          label="Your Review"
          required
        />
        <div className="mt-5">
          <Button
            name="Submit"
            styleClass="square color lighter"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ReviewForm);
