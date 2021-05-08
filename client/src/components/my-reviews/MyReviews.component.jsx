import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MyReviewCard from './sub-components/MyReviewCard.component';
import { getUserReviews } from '../../redux/user/user.actions';
import { selectUserReviews } from '../../redux/user/user.selectors';

const MyReviews = ({ reviews, getUserReviews }) => {
  useEffect(() => {
    getUserReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserReviews]);

  return (
    <div className="my-reviews">
      <h2 className="title bold py-5 mb-5">My Reviews</h2>
      <div className="py-4 mb-3 text-md-right text-sm-center">
        {reviews &&
          reviews.map((review) => <MyReviewCard key={review.id} data={review} />)}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reviews: selectUserReviews,
});

const mapDispatchToProps = (dispatch) => ({
  getUserReviews: () => dispatch(getUserReviews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);
