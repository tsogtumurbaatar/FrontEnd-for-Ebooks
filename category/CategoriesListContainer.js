import React from 'react';
import {CategoriesList} from './CategoriesList'; 
import {connect} from 'react-redux';
import { fetchCategories, removeCategories, removeCategoriesReset, filterAddCategory } from './categories';

const mapDispatchToProps = (dispatch) =>{
	return {
		fetchData:() => 					{ dispatch(fetchCategories())},
		resetMe:() => 						{ dispatch(removeCategoriesReset())},
		handleDeleteEvent:(categories) => 	{ dispatch(removeCategories(categories))},
		handleSearchEvent:(text)=>			{ dispatch(filterAddCategory(text))}
	}
}


const searchEventHandle =(categories, filter) =>{
		var updatedList = categories;
		updatedList = updatedList.filter(function(item){
			return item.cat_name.toLowerCase().search(filter.toLowerCase()) !== -1;
		});
		return updatedList
}


const mapStateToProps = (state) =>{
	return {
		categoriesToProps:searchEventHandle(state.category.categoriesList.categories, state.category.filterCategory),
		loadingToProps : state.category.categoriesList.loading,
		errorToProps : state.category.categoriesList.error,
		removedToProps:state.category.deletedCategories
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(CategoriesList)
