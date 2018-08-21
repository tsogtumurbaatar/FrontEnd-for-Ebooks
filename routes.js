import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/App';
import WelcomePage from './app/WelcomePage';
import IndexPage from './app/IndexPage';
import Sidebar from './app/Sidebar';
import BooksListContainer from './book/BooksListContainer';
import BookFormContainer from './book/BookFormContainer';
import CategoriesListContainer from './category/CategoriesListContainer';
import CategoryFormContainer from './category/CategoryFormContainer';
import LanguagesListContainer from './language/LanguagesListContainer';
import LanguageFormContainer from './language/LanguageFormContainer';
import UserCartDetailContainer from './shoppingcart/UserCartDetailContainer';
import UserCartAddressContainer from './shoppingcart/UserCartAddressContainer';
import UserCartConfirmationContainer from './shoppingcart/UserCartConfirmationContainer';
import SignInFormContainer from './user/SignInFormContainer';
import SignUpFormContainer from './user/SignUpFormContainer';
import DashBoard from './user/DashBoard';

export default (
  <Route path="/" component={App}>
  <IndexRoute components={IndexPage} />
  <Route path="/frontpage" components={{main:WelcomePage, sidebar:Sidebar}} >
      <Route path="/frontpage/:bookid" components={{main:WelcomePage, sidebar:Sidebar}} />     
  </Route> 
  <Route path="/book" component={BooksListContainer} />
  <Route path="/book/new" component={BookFormContainer} />
  <Route path="/book/new/:bookid" component={BookFormContainer} />
  <Route path="/category" component={CategoriesListContainer} />
  <Route path="/category/new" component={CategoryFormContainer} />
  <Route path="/category/new/:catid" component={CategoryFormContainer} />
  <Route path="/language" component={LanguagesListContainer} />
  <Route path="/language/new" component={LanguageFormContainer} />
  <Route path="/language/new/:lngid" component={LanguageFormContainer} />
  <Route path="/cart" component={UserCartDetailContainer} />
  <Route path="/shippingaddress" component={UserCartAddressContainer} /> 
  <Route path="/shippingconfirmation" component={UserCartConfirmationContainer} />
  <Route path="/signin" component={SignInFormContainer} />
  <Route path="/signup" component={SignUpFormContainer} />
  <Route path="/dashboard" component={DashBoard} />
  </Route>
  );