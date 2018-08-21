const initial_state = [];

export const cartItem = (state= initial_state, action) =>{
	switch(action.type) {
		case 'ADD_CART' :
			return [{ id:action.id,
					book:action.book,
					qty:action.qty},...state
					]
		
		case 'REMOVE_CART' :
			{
				return state.filter(x=> x.id != action.id)
			}

		case 'RESET_CART' :
			{
				return []
			}	

		case 'UPDATE_QTY_ADD' :
			{
				return state.map((s) => {
					if (s.id !== action.id) {
						return s;
					}
					return { qty : s.qty+1,
							 id : s.id,
							 book: s.book};
				});
			}
		case 'UPDATE_QTY_REMOVE' :
			{
				return state.map((s) => {
					if (s.id !== action.id) {
						return s;
					}
					if (s.qty == 1) {
						return s;
					}

					return { qty : s.qty-1,
							 id : s.id,
							 book: s.book};
				});
			}			
		
		default:
			return state
	}
}