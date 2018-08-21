import { fetchBooks } from '../book/books';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';
export const RESET_REVIEWS = 'RESET_REVIEWS';

export const ADD_REVIEW = 'ADD_REVIEW';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE';
export const RESET_ADD_REVIEW = 'RESET_ADD_REVIEW';

export const REMOVE_REVIEWS = 'REMOVE_REVIEWS';
export const REMOVE_REVIEWS_SUCCESS = 'REMOVE_REVIEWS_SUCCESS';
export const REMOVE_REVIEWS_FAILURE = 'REMOVE_REVIEWS_FAILURE';
export const RESET_REMOVE_REVIEWS = 'RESET_REMOVE_REVIEWS';

export const FETCH_REVIEW = 'FETCH_REVIEW';
export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';
export const FETCH_REVIEW_FAILURE = 'FETCH_REVIEW_FAILURE';
export const RESET_FETCH_REVIEW = 'RESET_REVIEW';

export const SAVE_REVIEW = 'SAVE_REVIEW';
export const SAVE_REVIEW_SUCCESS = 'SAVE_REVIEW_SUCCESS';
export const SAVE_REVIEW_FAILURE = 'SAVE_REVIEW_FAILURE';
export const RESET_SAVE_REVIEW = 'RESET_SAVE_REVIEW';

export const FILTER_ADD_REVIEW = 'FILTER_ADD_REVIEW';

export function filterAddReview(text) {
  return {
    type: FILTER_ADD_REVIEW,
    text:text
  };
}

export function fetchReviews(reviewid) {
	return (dispatch) => {
		dispatch(fetchReviewsStart())
		return fetch('api/review/fetch/'+reviewid, { method: 'GET'})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(fetchReviewsSuccess(json))
			}
			else{
				dispatch(fetchReviewsFailure())
			}
		})
	}
}

export function fetchReviewsStart() {
  return {
    type: FETCH_REVIEWS
  };
}

export function fetchReviewsSuccess(posts) {
  return {
    type: FETCH_REVIEWS_SUCCESS,
    payload: posts
  };
}

export function fetchReviewsFailure(error) {
  return {
    type: FETCH_REVIEWS_FAILURE,
    payload: error
  };
}

export function addReview(review, book_id) {
	return (dispatch) => {
		const token = sessionStorage.getItem('jwtToken');
		   if(!token || token === '') {
		    window.alert('Unauthenticated');
		    return;
		   }
		const userID = sessionStorage.getItem('jwtUserID');

		dispatch(addReviewStart())
		return fetch('api/review/add', { method: 'POST',
			body: JSON.stringify({ review_title : review.review_title,
								   review_body:review.review_body,
								   review_score:review.review_score,	
								   book_id : review.book_id,
								   user_id : userID
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization':'Bearer '+ token
			}
		})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(addReviewSuccess(json));
				dispatch(fetchReviews(book_id));
				dispatch(fetchBooks());
			}
			else{
				dispatch(addReviewFailure())
			}
		})
	}
}

export function addReviewStart() {
  return {
    type: ADD_REVIEW
  };
}

export function addReviewSuccess(posts) {
  return {
    type: ADD_REVIEW_SUCCESS,
    payload: posts
  };
}

export function addReviewFailure(error) {
  return {
    type: ADD_REVIEW_FAILURE,
    payload: error
  };
}

export function addReviewReset() {
  return {
    type: RESET_ADD_REVIEW
  };
}

export function removeReviews(review_ids) {
	return (dispatch) => {
		const token = sessionStorage.getItem('jwtToken');
		   if(!token || token === '') {
		    window.alert('Unauthenticated');
		    return;
		   }
		const userName = sessionStorage.getItem('jwtUserName');
		   if(userName!='admintsogsa') {
		    window.alert('Permission denied');
		    return;
		   }

		dispatch(removeReviewsStart())
		return fetch('api/review/remove', { method: 'POST',
			body: JSON.stringify({ review_ids : review_ids	
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization':'Bearer '+ token
			}
		})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(removeReviewsSuccess(json));
				dispatch(fetchReviews());
			}
			else{
				dispatch(removeReviewsFailure())
			}
		})
	}
}

export function removeReviewsStart() {
  return {
    type: REMOVE_REVIEWS
  };
}

export function removeReviewsSuccess(posts) {
  return {
    type: REMOVE_REVIEWS_SUCCESS,
    payload: posts
  };
}

export function removeReviewsFailure(error) {
  return {
    type: REMOVE_REVIEWS_FAILURE,
    payload: error
  };
}

export function removeReviewsReset() {
  return {
    type: RESET_REMOVE_REVIEWS
  };
}

export function fetchReview(reviewid) {
	return (dispatch) => {
		dispatch(fetchReviewStart())
		return fetch('api/review/fetch/'+reviewid, { method: 'GET'})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(fetchReviewSuccess(json))
			}
			else{
				dispatch(fetchReviewFailure())
			}
		})
	}
}

export function fetchReviewStart() {
  return {
    type: FETCH_REVIEW
  };
}

export function fetchReviewSuccess(posts) {
  return {
    type: FETCH_REVIEW_SUCCESS,
    payload: posts
  };
}

export function fetchReviewFailure(error) {
  return {
    type: FETCH_REVIEW_FAILURE,
    payload: error
  };
}

export function fetchReviewReset() {
  return {
    type: RESET_FETCH_REVIEW
  };
}

export function saveReview(review) {
	return (dispatch) => {
		const token = sessionStorage.getItem('jwtToken');
		   if(!token || token === '') {
		    window.alert('Unauthenticated');
		    return;
		   }
		const userName = sessionStorage.getItem('jwtUserName');
		   if(userName!='admintsogsa') {
		    window.alert('Permission denied');
		    return;
		   }

		dispatch(saveReviewStart())
		return fetch('api/review/save', { method: 'POST',
			body: JSON.stringify({  review_id : review.review_id,
									review_name : review.review_name,
								   review_motto:review.review_motto,	
								   review_desc : review.review_desc,
								   review_isbn : review.review_isbn,
								   review_publisher : review.review_publisher,
								   review_author : review.review_author,
								   review_price1 : review.review_price1,
								   review_price2 : review.review_price2,
								   cat_id : review.cat_id,
								   lng_id : review.lng_id,
								   review_img1 : review.review_img1,
								   review_img2 : review.review_img2,
								   review_img3 : review.review_img3,
								   review_img4 : review.review_img4
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization':'Bearer '+ token
			}
		})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(saveReviewSuccess(json));
				dispatch(fetchReviews());
			}
			else{
				dispatch(saveReviewFailure())
			}
		})
	}
}

export function saveReviewStart() {
  return {
    type: SAVE_REVIEW
  };
}

export function saveReviewSuccess(posts) {
  return {
    type: SAVE_REVIEW_SUCCESS,
    payload: posts
  };
}

export function saveReviewFailure(error) {
  return {
    type: SAVE_REVIEW_FAILURE,
    payload: error
  };
}

export function saveReviewReset() {
  return {
    type: RESET_SAVE_REVIEW
  };
}