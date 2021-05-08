import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../../custom-button/Button.component';
import { renderRatingStars } from '../../../utils/helper';
import { updateUserReview, deleteUserReview } from '../../../redux/user/user.actions';
import { selectUserReviews } from '../../../redux/user/user.selectors';

const MyReviewCard = ({ data, reviews, updateUserReview, deleteUserReview }) => {
  const { image, name, sku } = data.product;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [updateReview, setUpdateReview] = useState({
    review: data.review,
    rating: data.rating,
  });

  const settings = {
    size: 15,
    count: 5,
    color: '#ffc106',
    activeColor: '#ffc106',
    value: updateReview.rating,
    isHalf: true,
    emptyIcon: <i className="bi bi-star icon" />,
    halfIcon: <i className="bi bi-star-half icon" />,
    filledIcon: <i className="bi bi-star-fill icon" />,
    onChange: (newRating) => setUpdateReview({ ...updateReview, rating: newRating }),
  };

  const handleSubmit = (method) => {
    if (method === 'save') {
      updateUserReview(data.id, updateReview);
    } else if (method === 'delete') {
      deleteUserReview(data.id, reviews);
    }
    setToggleEdit(false);
  };

  return (
    <div className="my-reviews-card d-md-flex">
      <Link to={`/products/${name.toLowerCase().replace(/ /g, '-')}.${sku}`}>
        <div className="product-image mr-5 mb-4">
          <img src={image} alt={name} />
        </div>
      </Link>

      <div className="content d-flex flex-grow-1 flex-column">
        <h4 className="product-name bold text-left">{name}</h4>

        <div className="star text-left pb-4">
          {toggleEdit ? (
            <ReactStars {...settings} />
          ) : (
            renderRatingStars(updateReview.rating)
          )}
        </div>

        <div className="product-review text-left">
          {toggleEdit ? (
            <textarea
              className="input"
              value={updateReview.review}
              onChange={(e) =>
                setUpdateReview({ ...updateReview, review: e.target.value })
              }
            />
          ) : (
            updateReview.review
          )}
        </div>

        {toggleEdit && (
          <div className="btn mt-5 mx-auto">
            <Button
              name="Save"
              styleClass="square color lighter mr-5"
              onClick={() => handleSubmit('save')}
            />
            <Button
              name="Delete"
              styleClass="square white slide"
              onClick={() => handleSubmit('delete')}
            />
          </div>
        )}
      </div>
      {!toggleEdit ? (
        <i className="edit-btn bi bi-pencil-square" onClick={() => setToggleEdit(true)} />
      ) : (
        <i className="edit-btn bi bi-x-circle" onClick={() => setToggleEdit(false)} />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reviews: selectUserReviews,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserReview: (reviewId, updateReview) =>
    dispatch(updateUserReview(reviewId, updateReview)),
  deleteUserReview: (reviewId, reviews) => dispatch(deleteUserReview(reviewId, reviews)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReviewCard);
