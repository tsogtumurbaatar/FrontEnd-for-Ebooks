export const sortByBookID =(a,b)=>{
		if (a.book_id > b.book_id)
			return -1;
		if (a.book_id < b.book_id)
			return 1;
		return 0;
	} 

export const sortByBookPrice =(a,b)=>{
		if (a.book_price1 < b.book_price1)
			return -1;
		if (a.book_price1 > b.book_price1)
			return 1;
		return 0;
	} 

export const sortByBookPriceDesc =(a,b)=>{
		if (a.book_price1 > b.book_price1)
			return -1;
		if (a.book_price1 < b.book_price1)
			return 1;
		return 0;
	} 	

export const sortByBookPoint =(a,b)=>{
		if (a.book_point > b.book_point)
			return -1;
		if (a.book_point < b.book_point)
			return 1;
		return 0;
	} 	

export const sortByBookCount =(a,b)=>{
		if (a.book_review_count > b.book_review_count)
			return -1;
		if (a.book_review_count < b.book_review_count)
			return 1;
		return 0;
	} 	