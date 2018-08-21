import React from 'react';
import {BookForm} from './BookForm';
import {connect} from 'react-redux';
import { addBook, addBookReset, fetchBook, fetchBookReset, saveBook, fetchBooks } from './books';

const getBookId = (props) =>
{
	if(props.params.bookid)
	return props.params.bookid
	else
	return ;	
}

const mapDispatchToProps = (dispatch) =>{
	return {
		resetMe:() => 						{ dispatch(addBookReset())},
		resetMeActive:() => 				{ dispatch(fetchBookReset())},
		handleAddEvent:(book) => 			{ dispatch(addBook(book))},
		handleSaveEvent:(book) => 			{ dispatch(saveBook(book))},
		fetchBook:(book_id) => 				{ dispatch(fetchBook(book_id))}
	}
}

const mapStateToProps = (state, props) =>{
	return {
		bookidToProps:getBookId(props),
		activeBookToProps:state.book.activeBook,
		newBookToProps:state.book.newBook,
		categoriesToProps:state.category.categoriesList,
		lngsToProps:state.language.lngsList
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(BookForm)