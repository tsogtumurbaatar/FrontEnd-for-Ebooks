import React from 'react';
import {LanguagesList} from './LanguagesList'; 
import {connect} from 'react-redux';
import { fetchLanguages, removeLanguages, removeLanguagesReset, filterAddLanguage } from './languages';

const mapDispatchToProps = (dispatch) =>{
	return {
		fetchData:() => 					{ dispatch(fetchLanguages())},
		resetMe:() => 						{ dispatch(removeLanguagesReset())},
		handleDeleteEvent:(lngs) => 		{ dispatch(removeLanguages(lngs))},
		handleSearchEvent:(text)=>			{ dispatch(filterAddLanguage(text))}
	}
}


const searchEventHandle =(books, filter) =>{
		var updatedList = books;
		updatedList = updatedList.filter(function(item){
			if(item.lng_name !=null)
			return item.lng_name.toLowerCase().search(filter.toLowerCase()) !== -1;
		else
			return item.lng_name;
		});
		return updatedList
}


const mapStateToProps = (state) =>{
	return {
		lngsToProps:searchEventHandle(state.language.lngsList.lngs, state.language.filterLng),
		loadingToProps : state.language.lngsList.loading,
		errorToProps : state.language.lngsList.error,
		removedToProps:state.language.deletedLngs
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(LanguagesList)
