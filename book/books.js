export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const RESET_BOOKS = 'RESET_BOOKS';

export const ADD_BOOK = 'ADD_BOOK';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';
export const RESET_ADD_BOOK = 'RESET_ADD_BOOK';

export const REMOVE_BOOKS = 'REMOVE_BOOKS';
export const REMOVE_BOOKS_SUCCESS = 'REMOVE_BOOKS_SUCCESS';
export const REMOVE_BOOKS_FAILURE = 'REMOVE_BOOKS_FAILURE';
export const RESET_REMOVE_BOOKS = 'RESET_REMOVE_BOOKS';

export const FETCH_BOOK = 'FETCH_BOOK';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';
export const RESET_FETCH_BOOK = 'RESET_BOOK';

export const SAVE_BOOK = 'SAVE_BOOK';
export const SAVE_BOOK_SUCCESS = 'SAVE_BOOK_SUCCESS';
export const SAVE_BOOK_FAILURE = 'SAVE_BOOK_FAILURE';
export const RESET_SAVE_BOOK = 'RESET_SAVE_BOOK';

export const FILTER_ADD_BOOK = 'FILTER_ADD_BOOK';

export function filterAddBook(text) {
  return {
    type: FILTER_ADD_BOOK,
    text:text
  };
}

export function fetchBooks() {
	return (dispatch) => {
		dispatch(fetchBooksStart())
		return fetch('api/book/fetch', { method: 'GET'})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(fetchBooksSuccess(json))
			}
			else{
				dispatch(fetchBooksFailure())
			}
		})
	}
}

export function fetchBooksStart() {
  return {
    type: FETCH_BOOKS
  };
}

export function fetchBooksSuccess(posts) {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: posts
  };
}

export function fetchBooksFailure(error) {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: error
  };
}

export function addBook(book) {
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

		dispatch(addBookStart())
		return fetch('api/book/add', { method: 'POST',
			body: JSON.stringify({ book_name : book.book_name,
								   book_motto:book.book_motto,	
								   book_desc : book.book_desc,
								   book_isbn : book.book_isbn,
								   book_publisher : book.book_publisher,
								   book_author : book.book_author,
								   book_price1 : book.book_price1,
								   book_price2 : book.book_price2,
								   cat_id : book.cat_id,
								   lng_id : book.lng_id,
								   book_img1 : book.book_img1,
								   book_img2 : book.book_img2,
								   book_img3 : book.book_img3,
								   book_img4 : book.book_img4
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
				dispatch(addBookSuccess(json));
				dispatch(fetchBooks());
			}
			else{
				dispatch(addBookFailure())
			}
		})
	}
}

export function addBookStart() {
  return {
    type: ADD_BOOK
  };
}

export function addBookSuccess(posts) {
  return {
    type: ADD_BOOK_SUCCESS,
    payload: posts
  };
}

export function addBookFailure(error) {
  return {
    type: ADD_BOOK_FAILURE,
    payload: error
  };
}

export function addBookReset() {
  return {
    type: RESET_ADD_BOOK
  };
}

export function removeBooks(book_ids) {
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

		dispatch(removeBooksStart())
		return fetch('api/book/remove', { method: 'POST',
			body: JSON.stringify({ book_ids : book_ids	
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
				dispatch(removeBooksSuccess(json));
				dispatch(fetchBooks());
			}
			else{
				dispatch(removeBooksFailure())
			}
		})
	}
}

export function removeBooksStart() {
  return {
    type: REMOVE_BOOKS
  };
}

export function removeBooksSuccess(posts) {
  return {
    type: REMOVE_BOOKS_SUCCESS,
    payload: posts
  };
}

export function removeBooksFailure(error) {
  return {
    type: REMOVE_BOOKS_FAILURE,
    payload: error
  };
}

export function removeBooksReset() {
  return {
    type: RESET_REMOVE_BOOKS
  };
}

export function fetchBook(bookid) {
	return (dispatch) => {
		dispatch(fetchBookStart())
		return fetch('api/book/fetch/'+bookid, { method: 'GET'})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(fetchBookSuccess(json))
			}
			else{
				dispatch(fetchBookFailure())
			}
		})
	}
}

export function fetchBookStart() {
  return {
    type: FETCH_BOOK
  };
}

export function fetchBookSuccess(posts) {
  return {
    type: FETCH_BOOK_SUCCESS,
    payload: posts
  };
}

export function fetchBookFailure(error) {
  return {
    type: FETCH_BOOK_FAILURE,
    payload: error
  };
}

export function fetchBookReset() {
  return {
    type: RESET_FETCH_BOOK
  };
}

export function saveBook(book) {
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

		dispatch(saveBookStart())
		return fetch('api/book/save', { method: 'POST',
			body: JSON.stringify({  book_id : book.book_id,
									book_name : book.book_name,
								   book_motto:book.book_motto,	
								   book_desc : book.book_desc,
								   book_isbn : book.book_isbn,
								   book_publisher : book.book_publisher,
								   book_author : book.book_author,
								   book_price1 : book.book_price1,
								   book_price2 : book.book_price2,
								   cat_id : book.cat_id,
								   lng_id : book.lng_id,
								   book_img1 : book.book_img1,
								   book_img2 : book.book_img2,
								   book_img3 : book.book_img3,
								   book_img4 : book.book_img4
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
				dispatch(saveBookSuccess(json));
				dispatch(fetchBooks());
			}
			else{
				dispatch(saveBookFailure())
			}
		})
	}
}

export function saveBookStart() {
  return {
    type: SAVE_BOOK
  };
}

export function saveBookSuccess(posts) {
  return {
    type: SAVE_BOOK_SUCCESS,
    payload: posts
  };
}

export function saveBookFailure(error) {
  return {
    type: SAVE_BOOK_FAILURE,
    payload: error
  };
}

export function saveBookReset() {
  return {
    type: RESET_SAVE_BOOK
  };
}