import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, hashHistory} from 'react-router';
import routes from './routes';
import configureStore from './app/configureStore';

import { fetchCategories } from './category/categories';
import { fetchBooks } from './book/books';
import { fetchLanguages } from './language/languages';
import { meFromToken } from './user/users';

export const store=configureStore();

store.dispatch(fetchCategories());
store.dispatch(fetchBooks());
store.dispatch(fetchLanguages());

let token = sessionStorage.getItem('jwtToken');
	if(token && token != '') {
		store.dispatch(meFromToken(token));
	}

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory} routes={routes} />
	</Provider>,	
	document.getElementById('app')
	);