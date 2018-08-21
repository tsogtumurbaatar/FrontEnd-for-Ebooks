import React from 'react';
import {CategoryForm} from './CategoryForm';
import {connect} from 'react-redux';
import { addCategory, addCategoryReset, fetchCategory, fetchCategoryReset, saveCategory, fetchCategories } from './categories';

const getCatId = (props) =>
{
	if(props.params.catid)
	return props.params.catid
	else
	return ;	
}

const mapDispatchToProps = (dispatch) =>{
	return {
		resetMe:() => 						{ dispatch(addCategoryReset())},
		resetMeActive:() => 				{ dispatch(fetchCategoryReset())},
		handleAddEvent:(newcategory) => 	{ dispatch(addCategory(newcategory))},
		handleSaveEvent:(editedcategory) => { dispatch(saveCategory(editedcategory))},
		fetchCategory:(category_id) => 		{ dispatch(fetchCategory(category_id))}
	}
}


const mapStateToProps = (state, props) =>{
	return {
		catidToProps:getCatId(props),
		activeCategoryToProps:state.category.activeCategory,
		newCategoryToProps:state.category.newCategory
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(CategoryForm)