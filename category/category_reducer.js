import * as types from './categories';
const initial_state = {
					categoriesList :{categories:[], error:null, loading:false},
					newCategory: {category:null, error:null, loading:false},
					activeCategory:{category:null, error:null, loading:false, updated:false},
					deletedCategories : {categories:[], error:null, loading:false},
          filterCategory : ''
					}


export const category = (state= initial_state, action) =>{
  let error;
	switch(action.type) {
    case types.FILTER_ADD_CATEGORY:
    {
    return  Object.assign({}, state, { filterCategory : action.text} ); 
    }
		case types.FETCH_CATEGORIES:
		{
     
		return  Object.assign({}, state, { categoriesList : {categories:[], error:null, loading: true}} ); 
		}

		case types.FETCH_CATEGORIES_SUCCESS:
		{
		
    return Object.assign({},state, { categoriesList: {categories: action.payload, error:null, loading: false}} );
		}
		case types.FETCH_CATEGORIES_FAILURE:
    	error = action.payload;
   		return state;
    
    	case types.RESET_CATEGORIES:
    	return state;

    	case types.ADD_CATEGORY:
  		return Object.assign( {}, state, {newCategory: Object.assign( {}, state.newCategory, {error:null, loading: true})})
  		
  		case types.ADD_CATEGORY_SUCCESS:
  		return Object.assign( {}, state, {newCategory: {category:action.payload, error:null, loading: false}})
  		
  		case types.ADD_CATEGORY_FAILURE:
    	error = action.payload 
  		return Object.assign({},state, {newCategory: {category:null, error:error, loading: false}})
  		
  		case types.RESET_ADD_CATEGORY:
  		return Object.assign({}, state, {newCategory:{category:null, error:null, loading: false}})	


  		case types.REMOVE_CATEGORIES:
  		return Object.assign( {}, state, {deletedCategories: Object.assign( {}, state.deletedCategories, {error:null, loading: true})})
  		
  		case types.REMOVE_CATEGORIES_SUCCESS:
  		return Object.assign( {}, state, {deletedCategories: {categories:action.payload, error:null, loading: false}})
  		
  		case types.REMOVE_CATEGORIES_FAILURE:
    	error = action.payload 
  		return Object.assign({},state, {deletedCategories: {category:[], error:error, loading: false}})
  		
  		case types.RESET_REMOVE_CATEGORIES:
  		return Object.assign({}, state, {deletedCategories:{category:[], error:null, loading: false}})	


      case types.FETCH_CATEGORY:
      return Object.assign( {}, state, {activeCategory: Object.assign( {}, state.activeCategory, {error:null, loading: true})})
      
      case types.FETCH_CATEGORY_SUCCESS:
      return Object.assign( {}, state, {activeCategory: {category:action.payload, error:null, loading: false}})
      
      case types.FETCH_CATEGORY_FAILURE:
      error = action.payload 
      return Object.assign({},state, {activeCategory: {category:null, error:error, loading: false}})
      
      case types.RESET_FETCH_CATEGORY:
      return Object.assign({}, state, {activeCategory:{category:null, error:null, loading: false,updated:false}})  


      case types.SAVE_CATEGORY:
      return Object.assign( {}, state, {activeCategory: Object.assign( {}, state.activeCategory, {error:null, loading: true, updated:false})})
      
      case types.SAVE_CATEGORY_SUCCESS:
      return Object.assign( {}, state, {activeCategory: {category:action.payload, error:null, loading: false, updated:true}})
      
      case types.SAVE_CATEGORY_FAILURE:
      error = action.payload 
      return Object.assign({},state, {activeCategory: {category:null, error:error, loading: false, updated:false}})
      
      case types.RESET_SAVE_CATEGORY:
      return Object.assign({}, state, {activeCategory:{category:null, error:null, loading: false, updated:false}})  

    default:
    return state
}
}		