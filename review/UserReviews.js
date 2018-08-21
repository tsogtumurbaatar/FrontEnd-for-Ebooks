import React from 'react';
import {connect} from 'react-redux';
import { addReview, fetchReviews, addReviewReset } from './reviews';
import {UserReviewsWriteReview} from './UserReviewsWriteReview';
import {UserReviewsList} from './UserReviewsList';


const mapDispatchToProps = (dispatch) =>{
	return {
		handleAddEvent:(review, book_id) => { dispatch(addReview(review, book_id))},
		fetchData:(reviewid) =>   { dispatch(fetchReviews(reviewid))},
		resetMeActive:() => 	{ dispatch(addReviewReset())}
	}
}

const mapStateToProps = (state) =>{
	return {
		reviewsToProps:state.review.reviewsList.reviews,
		newReview : state.review.newReview
	}
}


class UserReviews extends React.Component{
	constructor(props)
	{
		super(props);
	}

	componentWillMount()
	{
		if(this.props.book_id)
		this.props.fetchData(this.props.book_id);
	}

	render(){
		return(
			<div>
			<UserReviewsWriteReview
				book_id = {this.props.book_id}
				newReview = {this.props.newReview}
				handleAddEvent = {this.props.handleAddEvent}
				resetMeActive = {this.props.resetMeActive}
				reviews = {this.props.reviewsToProps}
				/>

			<UserReviewsList
				reviews = {this.props.reviewsToProps}
				/>

			</div>
		)
	}
}

export const UserReviewsConn =  connect(mapStateToProps,mapDispatchToProps)(UserReviews)