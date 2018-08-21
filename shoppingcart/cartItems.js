let nextTodoId = 0

export const addCart = (book, qty) => {
	return {
		type:'ADD_CART',
		id: nextTodoId++,
		book: book,
		qty:qty
	}
}

export const removeCart = (id) => {
	return {
		type:'REMOVE_CART',
		id: id
	}
}

export const resetCart = () => {
	return {
		type:'RESET_CART'
	}
}

export const updateQtyAdd = (id) =>{
	return {
		type:'UPDATE_QTY_ADD',
		id: id
	}
}

export const updateQtyRemove = (id) =>{
	return {
		type:'UPDATE_QTY_REMOVE',
		id: id
	}
}
