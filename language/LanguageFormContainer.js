import React from 'react';
import {LanguageForm} from './LanguageForm';
import {connect} from 'react-redux';
import { addLanguage, addLanguageReset, fetchLanguage, fetchLanguageReset, saveLanguage, fetchLanguages } from './languages';

const getLngId = (props) =>
{
	if(props.params.lngid)
	return props.params.lngid
	else
	return ;	
}

const mapDispatchToProps = (dispatch) =>{
	return {
		resetMe:() => 						{ dispatch(addLanguageReset())},
		resetMeActive:() => 				{ dispatch(fetchLanguageReset())},
		handleAddEvent:(lng) => 			{ dispatch(addLanguage(lng))},
		handleSaveEvent:(lng) => 			{ dispatch(saveLanguage(lng))},
		fetchLanguage:(lng_id) => 			{ dispatch(fetchLanguage(lng_id))}
	}
}


const mapStateToProps = (state, props) =>{
	return {
		lngidToProps: getLngId(props),
		activeLngToProps:state.language.activeLng,
		newLngToProps:state.language.newLng,
	}
}


export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(LanguageForm)