import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';
import ReactStars from 'react-rating-stars-component';

import Button from '../../custom-button/Button.component';
import { renderRatingStars, toastSetting } from '../../../utils/helper';
import { selectCurrentUser, selectUserReviews } from '../../../redux/user/user.selectors';
import { updateUserReview, deleteUserReview } from '../../../redux/user/user.actions';
import { deleteProductReview } from '../../../redux/review/review.actions';

const ReviewCard = ({
  currentUser,
  user,
  reviewContent,
  updateUserReview,
  deleteUserReview,
  userReviews,
}) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [updateReview, setUpdateReview] = useState({
    review: reviewContent.review,
    rating: reviewContent.rating,
  });

  const handleSubmit = (method) => {
    if (method === 'save') {
      updateUserReview(reviewContent.id, updateReview);
    } else if (method === 'delete') {
      deleteUserReview(reviewContent.id, userReviews);
      window.location.reload();
      toast('Your review was deleted successfully!', toastSetting);
    }
    setToggleEdit(false);
  };

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

  return (
    <div className="row review-card p-4 mx-auto">
      <div className="avatar mr-4">
        <img src={user.photo} alt="" />
      </div>

      <div className="content d-flex flex-grow-1 flex-column px-2">
        <div className="d-flex">
          <span className="author-name bold mr-4">{user.name}</span>
          <span className="star">
            {toggleEdit ? (
              <ReactStars {...settings} />
            ) : (
              renderRatingStars(updateReview.rating)
            )}
          </span>
        </div>
        <div className="author-review mt-3">
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
          <div className="save-btn mt-4 mx-auto" onClick={handleSubmit}>
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

      {!toggleEdit && currentUser && currentUser.id === user._id && (
        <i className="edit-btn bi bi-pencil-square" onClick={() => setToggleEdit(true)} />
      )}
      {toggleEdit && currentUser && currentUser.id === user._id && (
        <i className="edit-btn bi bi-x-circle" onClick={() => setToggleEdit(false)} />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userReviews: selectUserReviews,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserReview: (reviewId, updateReview) =>
    dispatch(updateUserReview(reviewId, updateReview)),
  deleteUserReview: (reviewId, reviews) => dispatch(deleteUserReview(reviewId, reviews)),
  deleteProductReview: (reviewId) => dispatch(deleteProductReview(reviewId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);
