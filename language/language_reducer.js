import * as types from './languages';
const initial_state = {
         lngsList :{lngs:[], error:null, loading:false},
         newLng: {lng:null, error:null, loading:false},
         activeLng:{lng:null, error:null, loading:false, updated:false},
         deletedLngs : {lngs:[], error:null, loading:false},
         filterLng : ''
}


export const language = (state= initial_state, action) =>{
  let error;
  switch(action.type) {
    case types.FILTER_ADD_LANGUAGE:
    return  Object.assign({}, state, { filterLng : action.text} ); 

    case types.FETCH_LANGUAGES:
    return  Object.assign({}, state, { lngsList : {lngs:[], error:null, loading: true}} ); 
    case types.FETCH_LANGUAGES_SUCCESS:
    return Object.assign({},state, { lngsList: {lngs: action.payload, error:null, loading: false}} );
    case types.FETCH_LANGUAGES_FAILURE:
    error = action.payload;
    return state;
    
    case types.RESET_LANGUAGES:
    return state;

    case types.ADD_LANGUAGE:
    return Object.assign( {}, state, {newLng: Object.assign( {}, state.newLng, {error:null, loading: true})})

    case types.ADD_LANGUAGE_SUCCESS:
    return Object.assign( {}, state, {newLng: {lng:action.payload, error:null, loading: false}})

    case types.ADD_LANGUAGE_FAILURE:
    error = action.payload 
    return Object.assign({},state, {newLng: {lng:null, error:error, loading: false}})

    case types.RESET_ADD_LANGUAGE:
    return Object.assign({}, state, {newLng:{lng:null, error:null, loading: false}})	


    case types.REMOVE_LANGUAGES:
    return Object.assign( {}, state, {deletedLngs: Object.assign( {}, state.deletedLngs, {error:null, loading: true})})

    case types.REMOVE_LANGUAGES_SUCCESS:
    return Object.assign( {}, state, {deletedLngs: {Lngs:action.payload, error:null, loading: false}})

    case types.REMOVE_LANGUAGES_FAILURE:
    error = action.payload 
    return Object.assign({},state, {deletedLngs: {lng:[], error:error, loading: false}})

    case types.RESET_REMOVE_LANGUAGES:
    return Object.assign({}, state, {deletedLngs:{lng:[], error:null, loading: false}})	


    case types.FETCH_LANGUAGE:
    return Object.assign( {}, state, {activeLng: Object.assign( {}, state.activeLng, {error:null, loading: true})})

    case types.FETCH_LANGUAGE_SUCCESS:
    return Object.assign( {}, state, {activeLng: {lng:action.payload, error:null, loading: false}})

    case types.FETCH_LANGUAGE_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeLng: {lng:null, error:error, loading: false}})

    case types.RESET_FETCH_LANGUAGE:
    return Object.assign({}, state, {activeLng:{lng:null, error:null, loading: false,updated:false}})  


    case types.SAVE_LANGUAGE:
    return Object.assign( {}, state, {activeLng: Object.assign( {}, state.activeLng, {error:null, loading: true, updated:false})})

    case types.SAVE_LANGUAGE_SUCCESS:
    return Object.assign( {}, state, {activeLng: {lng:action.payload, error:null, loading: false, updated:true}})

    case types.SAVE_LANGUAGE_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeLng: {lng:null, error:error, loading: false, updated:false}})

    case types.RESET_SAVE_LANGUAGE:
    return Object.assign({}, state, {activeLng:{lng:null, error:null, loading: false, updated:false}})  

    default:
    return state
  }
}		