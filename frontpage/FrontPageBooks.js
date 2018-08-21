import React from 'react';
import {FrontPageBook} from './FrontPageBook';
import {FrontPageFilterBar} from './FrontPageFilterBar';
import {FrontPageBooksPagination} from './FrontPageBooksPagination';
import {FrontPageOrderView} from './FrontPageOrderView';
import * as func from '../app/functions';

var divStyle = {
	paddingBottom: 15
};



export class FrontPageBooks extends React.Component{
	constructor(props)
	{
		super(props);
		this.state={
			currentPage: 1,
			booksPerPage: 9,
			filterBook :'',
			viewOption:0,	//0 - by box, 1 - by line
			viewOrder:0
			}
		this.searchEventHandle = this.searchEventHandle.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.setViewOption = this.setViewOption.bind(this);
		this.setViewOrder = this.setViewOrder.bind(this);
	}

	componentWillReceiveProps(nextProps)
	{
		if(nextProps.filterBook!='')
			this.setState({filterBook:nextProps.filterBook});

		if((nextProps.catid!='showall')||(nextProps.lngid!='showall'))
			this.setState({currentPage:1});
	}

	setViewOption(value)
	{
		if(value==0)
			this.setState({viewOption:0});
		if(value==1)
			this.setState({viewOption:1});
	}

	setViewOrder(value)
	{
		if(value==0)
			this.setState({viewOrder:0});
		else
		if(value==1)
			this.setState({viewOrder:1});
		else
		if(value==2)
			this.setState({viewOrder:2});
		else
		if(value==3)
			this.setState({viewOrder:3});
		else
		if(value==4)
			this.setState({viewOrder:4});
	}

	searchEventHandle(event)
	{
		this.setState({filterBook:event.target.value});
		this.props.handleSearchEvent(event.target.value);
		this.setState({currentPage:1});
	}

	handleClick(event){
		this.setState({currentPage:Number(event.target.id)});
	}

	

	render(){
		const books = this.props.booksToProps;
		const loading = this.props.booksloadingToProps;
		const error = this.props.bookserrorToProps;

		switch(this.state.viewOrder){
			case 0: books.sort(func.sortByBookID);  break;
			case 1: books.sort(func.sortByBookPrice);break;
			case 2: books.sort(func.sortByBookPriceDesc); break;
			case 3: books.sort(func.sortByBookPoint);break;
			case 4: books.sort(func.sortByBookCount); break;
			default:
		}

		const indexOfLastBook = this.state.currentPage * this.state.booksPerPage;
		const indexOfFirstBook = indexOfLastBook - this.state.booksPerPage;
		const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(books.length / this.state.booksPerPage); i++) {
			pageNumbers.push(i);
		}

		if(loading) {
			return <div><h2>Books list : </h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} else if(error) {
			return <div className="alert alert-danger">Error: {error.message}</div>
		} 


		return(
			<div className="row">
			<div className="col-md-7" style={divStyle}>
			<input type="text" className="form-control" value={this.state.filterBook || this.props.filterBook} placeholder="Search" onChange={this.searchEventHandle}/>
			</div>
			
			<FrontPageOrderView 
				viewOption = {this.state.viewOption}
				setViewOption = {this.setViewOption}
				setViewOrder = {this.setViewOrder}
				/>

			<FrontPageFilterBar
				catid = {this.props.catid}
				lngid = {this.props.lngid}
				categories = {this.props.categories}
				lngs = {this.props.lngs} 
				/>

			{currentBooks.map((book)=>
				<FrontPageBook 
					key={book.book_id} 
					book={book} 
					viewOption = {this.state.viewOption}
					/>
			)}

			<FrontPageBooksPagination 
				pageNumbers = {pageNumbers}
				handleClick= {this.handleClick}
				currentPage = {this.state.currentPage}
				/>
			</div>
		)
	}
}
