import React from 'react';
import {FrontPageBooks} from './FrontPageBooks'; 
import {connect} from 'react-redux';
import { fetchBooks, removeBooks, removeBooksReset, filterAddBook } from '../book/books';

const mapDispatchToProps = (dispatch) =>{
	return {
		fetchData:() => 					{ dispatch(fetchBooks())},
		resetMe:() => 						{ dispatch(removeBooksReset())},
		handleDeleteEvent:(books) => 		{ dispatch(removeBooks(books))},
		handleSearchEvent:(text)=>			{ dispatch(filterAddBook(text))}
	}
}


const searchEventHandle =(books, filter) =>{
		var updatedList = books;
		updatedList = updatedList.filter(function(item){
			if(item.book_name !=null)
			return item.book_name.toLowerCase().search(filter.toLowerCase()) !== -1;
		else
			return item.book_name;
		});
		return updatedList
}

const filtersByCatLang=(books, catid, lngid) =>{
	var booksList = books;
	if(catid!='showall')
		booksList = booksList.filter(book =>book.cat_id==catid);
	if(lngid!='showall')
		booksList = booksList.filter(book =>book.lng_id==lngid);

	return booksList;
}


const mapStateToProps = (state, props) =>{
	return {
		booksToProps:filtersByCatLang(searchEventHandle(state.book.booksList.books, state.book.filterBook),props.catid, props.lngid),
		booksloadingToProps : state.book.booksList.loading,
		bookserrorToProps : state.book.booksList.error,
		catid : props.catid,
		lngid : props.lngid,
		categories : state.category.categoriesList.categories,
		lngs : state.language.lngsList.lngs,
		filterBook : state.book.filterBook
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(FrontPageBooks)
