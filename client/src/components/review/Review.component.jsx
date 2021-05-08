import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReviewCard from './sub-components/ReviewCard.component';
import ReviewForm from './sub-components/ReviewForm.component';

import { fetchProductReviews } from '../../redux/review/review.actions';
import { selectReviews } from '../../redux/review/review.selectors';

const Review = ({ productId, fetchProductReviews, reviews }) => {
  const loadCards = () => {
    fetchProductReviews(productId);
  };

  useEffect(() => {
    loadCards();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="review">
      {reviews &&
        reviews.map((review, i) => (
          <ReviewCard key={review.id} user={review.user} reviewContent={review} />
        ))}
      {/* <ReviewForm productId={productId} /> */}
      <ReviewForm productId={productId} onCreate={() => loadCards()} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reviews: selectReviews,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductReviews: (productId) => dispatch(fetchProductReviews(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);
