import * as types from './books';
const initial_state = {
 booksList :{books:[], error:null, loading:false},
 newBook: {book:null, error:null, loading:false},
 activeBook:{book:null, error:null, loading:false, updated:false},
 deletedBooks : {books:[], error:null, loading:false},
 filterBook : ''
}


export const book = (state= initial_state, action) =>{
  let error;
  switch(action.type) {
    case types.FILTER_ADD_BOOK:
    return  Object.assign({}, state, { filterBook : action.text} ); 
    case types.FETCH_BOOKS:
    return  Object.assign({}, state, { booksList : {books:[], error:null, loading: true}} ); 
    case types.FETCH_BOOKS_SUCCESS:
    return Object.assign({},state, { booksList: {books: action.payload, error:null, loading: false}} );
    case types.FETCH_BOOKS_FAILURE:
    error = action.payload;
    return state;
    
    case types.RESET_BOOKS:
    return state;

    case types.ADD_BOOK:
    return Object.assign( {}, state, {newBook: Object.assign( {}, state.newBook, {error:null, loading: true})})

    case types.ADD_BOOK_SUCCESS:
    return Object.assign( {}, state, {newBook: {book:action.payload, error:null, loading: false}})

    case types.ADD_BOOK_FAILURE:
    error = action.payload 
    return Object.assign({},state, {newBook: {book:null, error:error, loading: false}})

    case types.RESET_ADD_BOOK:
    return Object.assign({}, state, {newBook:{book:null, error:null, loading: false}})	


    case types.REMOVE_BOOKS:
    return Object.assign( {}, state, {deletedBooks: Object.assign( {}, state.deletedBooks, {error:null, loading: true})})

    case types.REMOVE_BOOKS_SUCCESS:
    return Object.assign( {}, state, {deletedBooks: {Books:action.payload, error:null, loading: false}})

    case types.REMOVE_BOOKS_FAILURE:
    error = action.payload 
    return Object.assign({},state, {deletedBooks: {book:[], error:error, loading: false}})

    case types.RESET_REMOVE_BOOKS:
    return Object.assign({}, state, {deletedBooks:{book:[], error:null, loading: false}})	


    case types.FETCH_BOOK:
    return Object.assign( {}, state, {activeBook: Object.assign( {}, state.activeBook, {error:null, loading: true})})

    case types.FETCH_BOOK_SUCCESS:
    return Object.assign( {}, state, {activeBook: {book:action.payload, error:null, loading: false}})

    case types.FETCH_BOOK_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeBook: {book:null, error:error, loading: false}})

    case types.RESET_FETCH_BOOK:
    return Object.assign({}, state, {activeBook:{book:null, error:null, loading: false,updated:false}})  


    case types.SAVE_BOOK:
    return Object.assign( {}, state, {activeBook: Object.assign( {}, state.activeBook, {error:null, loading: true, updated:false})})

    case types.SAVE_BOOK_SUCCESS:
    return Object.assign( {}, state, {activeBook: {book:action.payload, error:null, loading: false, updated:true}})

    case types.SAVE_BOOK_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeBook: {book:null, error:error, loading: false, updated:false}})

    case types.RESET_SAVE_BOOK:
    return Object.assign({}, state, {activeBook:{book:null, error:null, loading: false, updated:false}})  

    default:
    return state
  }
}		