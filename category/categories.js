export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';
export const RESET_ADD_CATEGORY = 'RESET_ADD_CATEGORY';

export const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES';
export const REMOVE_CATEGORIES_SUCCESS = 'REMOVE_CATEGORIES_SUCCESS';
export const REMOVE_CATEGORIES_FAILURE = 'REMOVE_CATEGORIES_FAILURE';
export const RESET_REMOVE_CATEGORIES = 'RESET_REMOVE_CATEGORIES';

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';
export const RESET_FETCH_CATEGORY = 'RESET_CATEGORY';

export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const SAVE_CATEGORY_SUCCESS = 'SAVE_CATEGORY_SUCCESS';
export const SAVE_CATEGORY_FAILURE = 'SAVE_CATEGORY_FAILURE';
export const RESET_SAVE_CATEGORY = 'RESET_SAVE_CATEGORY';

export const FILTER_ADD_CATEGORY = 'FILTER_ADD_CATEGORY';

export function filterAddCategory(text) {
  return {
    type: FILTER_ADD_CATEGORY,
    text:text
  };
}

export function fetchCategories() {
	return (dispatch) => {
		dispatch(fetchCategoriesStart())
		return fetch('api/category/fetch', { method: 'GET'})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(fetchCategoriesSuccess(json))
			}
			else{
				dispatch(fetchCategoriesFailure())
			}
		})
	}
}

export function fetchCategoriesStart() {
  return {
    type: FETCH_CATEGORIES
  };
}

export function fetchCategoriesSuccess(posts) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: posts
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error
  };
}

export function addCategory(category) {
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

		dispatch(addCategoryStart())
		return fetch('api/category/add', { method: 'POST',
			body: JSON.stringify({ cat_name : category.cat_name,
								   cat_desc : category.cat_desc	
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
				dispatch(addCategorySuccess(json));
				dispatch(fetchCategories());
			}
			else{
				dispatch(addCategoryFailure())
			}
		})
	}
}

export function addCategoryStart() {
  return {
    type: ADD_CATEGORY
  };
}

export function addCategorySuccess(posts) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: posts
  };
}

export function addCategoryFailure(error) {
  return {
    type: ADD_CATEGORY_FAILURE,
    payload: error
  };
}

export function addCategoryReset() {
  return {
    type: RESET_ADD_CATEGORY
  };
}

export function removeCategories(categoriesID) {
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

		dispatch(removeCategoriesStart())
		return fetch('api/category/remove', { method: 'POST',
			body: JSON.stringify({ cat_ids : categoriesID	
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
				dispatch(removeCategoriesSuccess(json));
				dispatch(fetchCategories());
			}
			else{
				dispatch(removeCategoriesFailure())
			}
		})
	}
}

export function removeCategoriesStart() {
  return {
    type: REMOVE_CATEGORIES
  };
}

export function removeCategoriesSuccess(posts) {
  return {
    type: REMOVE_CATEGORIES_SUCCESS,
    payload: posts
  };
}

export function removeCategoriesFailure(error) {
  return {
    type: REMOVE_CATEGORIES_FAILURE,
    payload: error
  };
}

export function removeCategoriesReset() {
  return {
    type: RESET_REMOVE_CATEGORIES
  };
}

export function fetchCategory(catid) {
	return (dispatch) => {
		dispatch(fetchCategoryStart())
		return fetch('api/category/fetch/'+catid, { method: 'GET'})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(fetchCategorySuccess(json))
			}
			else{
				dispatch(fetchCategoryFailure())
			}
		})
	}
}

export function fetchCategoryStart() {
  return {
    type: FETCH_CATEGORY
  };
}

export function fetchCategorySuccess(posts) {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: posts
  };
}

export function fetchCategoryFailure(error) {
  return {
    type: FETCH_CATEGORY_FAILURE,
    payload: error
  };
}

export function fetchCategoryReset() {
  return {
    type: RESET_FETCH_CATEGORY
  };
}

export function saveCategory(category) {
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

		dispatch(saveCategoryStart())
		return fetch('api/category/save', { method: 'POST',
			body: JSON.stringify({  cat_id : category.cat_id,
									cat_name : category.cat_name,
								    cat_desc : category.cat_desc	
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
				dispatch(saveCategorySuccess(json));
				dispatch(fetchCategories());
			}
			else{
				dispatch(saveCategoryFailure())
			}
		})
	}
}

export function saveCategoryStart() {
  return {
    type: SAVE_CATEGORY
  };
}

export function saveCategorySuccess(posts) {
  return {
    type: SAVE_CATEGORY_SUCCESS,
    payload: posts
  };
}

export function saveCategoryFailure(error) {
  return {
    type: SAVE_CATEGORY_FAILURE,
    payload: error
  };
}

export function saveCategoryReset() {
  return {
    type: RESET_SAVE_CATEGORY
  };
}