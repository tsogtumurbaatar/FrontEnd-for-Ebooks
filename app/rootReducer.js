import {combineReducers} from 'redux';
import {category} from '../category/category_reducer';
import {language} from '../language/language_reducer';
import {book} from '../book/book_reducer';
import {review} from '../review/review_reducer';
import {cartItem} from '../shoppingcart/cartItem_reducer';
import {user} from '../user/user_reducer';
import {order} from '../order/order_reducer';

const rootReducer = combineReducers({
	category : category,
	language : language,	
	book : book,
	review : review,
	cartItem : cartItem,
	order : order,
	user : user
})

export default rootReducer