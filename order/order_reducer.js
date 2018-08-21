const initial_state = 
{
	newOrder : {id:'', items:[], address:{}, loading:false, error:null},
	ordersList :{orders:[], error:null, loading:false}
}
export const order = (state= initial_state, action) =>{
	switch(action.type) {
		case 'ADD_ORDER' :
			 return Object.assign( {}, state, {newOrder: {id:action.id,items:action.items, address:action.address, error:null, loading: false}})
		
		case 'SAVE_ORDER' :
			 return Object.assign( {}, state, {newOrder: Object.assign( {}, state.newOrder, {error:null, loading: true})})

		case 'SAVE_ORDER_SUCCESS' :
			 return Object.assign( {}, state, {newOrder: Object.assign( {}, state.newOrder, {error:null, loading: false})})

		case 'SAVE_ORDER_FAILURE' :
			 error = action.payload 
			 return Object.assign( {}, state, {newOrder: Object.assign( {}, state.newOrder, { error:error, loading: false})})

		
		case 'FETCH_ORDERS':
    		 return Object.assign( {}, state, { ordersList: {orders:[], error:null, loading: true}} ); 
    
    	case 'FETCH_ORDERS_SUCCESS':
    		 return Object.assign( {}, state, { ordersList: {orders: action.payload, error:null, loading: false}} );
    
    	case 'FETCH_ORDERS_FAILURE':
    	error = action.payload;
    		return state;
			  
		
		default:
			return state
	}
}