let nextTodoId = 0

export const addOrder = (items, address) => {
	return {
		type:'ADD_ORDER',
		id: nextTodoId++,
		items: items,
		address:address
	}
}

export function saveOrderStart() {
  return {
    type: 'SAVE_ORDER'
  };
}

export function saveOrderSuccess() {
  return {
    type: 'SAVE_ORDER_SUCCESS'
  };
}

export function saveOrderFailure(error) {
  return {
    type: 'SAVE_ORDER_FAILURE',
    payload: error
  };
}


export function saveOrder(items, address) {
	return (dispatch) => {
		const token = sessionStorage.getItem('jwtToken');
		   if(!token || token === '') {
		    window.alert('Unauthenticated');
		    return;
		   }
		const userID = sessionStorage.getItem('jwtUserID');   

		dispatch(saveOrderStart())
		return fetch('api/order/save', { method: 'POST',
			body: JSON.stringify({ items : items,
								   address: address,
								   user_id : userID
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
				dispatch(saveOrderSuccess());
			}
			else{
				dispatch(saveOrderFailure())
			}
		})
	}
}

export function fetchOrdersStart() {
  return {
    type: 'FETCH_ORDERS'
  };
}

export function fetchOrdersSuccess(posts) {
  return {
    type: 'FETCH_ORDERS_SUCCESS',
    payload: posts
  };
}

export function fetchOrdersFailure(error) {
  return {
    type: 'FETCH_ORDERS_FAILURE',
    payload: error
  };
}

export function fetchOrders() {
	return (dispatch) => {
		const token = sessionStorage.getItem('jwtToken');
		   if(!token || token === '') {
		    window.alert('Unauthenticated');
		    return;
		   }

		const userID = sessionStorage.getItem('jwtUserID');   

		dispatch(fetchOrdersStart())
		return fetch('api/order/getorder', { method: 'POST',
			body: JSON.stringify({ user_id : userID	
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
				dispatch(fetchOrdersSuccess(json));
			}
			else{
				dispatch(fetchOrdersFailure())
			}
		})
	}
}
