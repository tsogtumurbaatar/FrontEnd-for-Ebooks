import * as types from './reviews';
const initial_state = {
 reviewsList :{reviews:[], error:null, loading:false},
 newReview: {review:null, error:null, loading:false},
 activeReview:{review:null, error:null, loading:false, updated:false},
 deletedReviews : {reviews:[], error:null, loading:false},
 filterReview : ''
}


export const review = (state= initial_state, action) =>{
  let error;
  switch(action.type) {
    
    case types.FILTER_ADD_REVIEW:
    return  Object.assign({}, state, { filterReview : action.text} ); 
    case types.RESET_REVIEWS:
    return state;

    
    
    case types.FETCH_REVIEWS:
    return  Object.assign({}, state, { reviewsList : {reviews:[], error:null, loading: true}} ); 
    
    case types.FETCH_REVIEWS_SUCCESS:
    return Object.assign({},state, { reviewsList: {reviews: action.payload, error:null, loading: false}} );
    
    case types.FETCH_REVIEWS_FAILURE: 
    error = action.payload;
    return  Object.assign({}, state, { reviewsList : {reviews:[], error:error, loading: false}} ); 

    
    case types.FETCH_REVIEW:
    return Object.assign( {}, state, {activeReview: Object.assign( {}, state.activeReview, {error:null, loading: true})})

    case types.FETCH_REVIEW_SUCCESS:
    return Object.assign( {}, state, {activeReview: {review:action.payload, error:null, loading: false}})

    case types.FETCH_REVIEW_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeReview: {review:null, error:error, loading: false}})

    case types.RESET_FETCH_REVIEW:
    return Object.assign({}, state, {activeReview:{review:null, error:null, loading: false,updated:false}})  
    

    case types.ADD_REVIEW:
    return Object.assign( {}, state, {newReview: Object.assign( {}, state.newReview, {error:null, loading: true})})

    case types.ADD_REVIEW_SUCCESS:
    return Object.assign( {}, state, {newReview: {review:action.payload, error:null, loading: false}})

    case types.ADD_REVIEW_FAILURE:
    error = action.payload 
    return Object.assign({},state, {newReview: {review:null, error:error, loading: false}})

    case types.RESET_ADD_REVIEW:
    return Object.assign({}, state, {newReview:{review:null, error:null, loading: false}})	


    case types.REMOVE_REVIEWS:
    return Object.assign( {}, state, {deletedReviews: Object.assign( {}, state.deletedReviews, {error:null, loading: true})})

    case types.REMOVE_REVIEWS_SUCCESS:
    return Object.assign( {}, state, {deletedReviews: {Reviews:action.payload, error:null, loading: false}})

    case types.REMOVE_REVIEWS_FAILURE:
    error = action.payload 
    return Object.assign({},state, {deletedReviews: {review:[], error:error, loading: false}})

    case types.RESET_REMOVE_REVIEWS:
    return Object.assign({}, state, {deletedReviews:{review:[], error:null, loading: false}})	


    case types.SAVE_REVIEW:
    return Object.assign( {}, state, {activeReview: Object.assign( {}, state.activeReview, {error:null, loading: true, updated:false})})

    case types.SAVE_REVIEW_SUCCESS:
    return Object.assign( {}, state, {activeReview: {review:action.payload, error:null, loading: false, updated:true}})

    case types.SAVE_REVIEW_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeReview: {review:null, error:error, loading: false, updated:false}})

    case types.RESET_SAVE_REVIEW:
    return Object.assign({}, state, {activeReview:{review:null, error:null, loading: false, updated:false}})  

    default:
    return state
  }
}		