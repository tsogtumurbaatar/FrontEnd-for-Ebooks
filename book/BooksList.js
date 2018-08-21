import React from 'react';
import { Link } from 'react-router';
import PaginationFooter from '../app/PaginationFooter';


export class BooksList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			booksPerPage: 10,
			sortType:1,
			filterBook :''
		}
		this.getCheckEvent = this.getCheckEvent.bind(this);
		this.searchEventHandle = this.searchEventHandle.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.sortEventHandle = this.sortEventHandle.bind(this);
	}

	componentWillMount() {
		this.props.resetMe();
	}

	componentWillReceiveProps(nextProps)
	{
		if(nextProps.filterBook!='')
			this.setState({filterBook:nextProps.filterBook});
	}

	handleClick(event){
		this.setState({currentPage:Number(event.target.id)});
	}

	sortByBookName(a,b){
		if (a.book_name < b.book_name)
			return -1;
		if (a.book_name > b.book_name)
			return 1;
		return 0;
	} 

	sortByBookNameDesc(a,b){
		if (a.book_name < b.book_name)
			return 1;
		if (a.book_name > b.book_name)
			return -1;
		return 0;
	} 

	sortByBookID(a,b){
		if (a.book_id < b.book_id)
			return -1;
		if (a.book_id > b.book_id)
			return 1;
		return 0;
	} 

	sortByBookIDDesc(a,b){
		if (a.book_id < b.book_id)
			return 1;
		if (a.book_id > b.book_id)
			return -1;
		return 0;
	} 

	sortByCatName(a,b){
		if (a.cat_name < b.cat_name)
			return -1;
		if (a.cat_name > b.cat_name)
			return 1;
		return 0;
	} 

	sortByCatNameDesc(a,b){
		if (a.cat_name < b.cat_name)
			return 1;
		if (a.cat_name > b.cat_name)
			return -1;
		return 0;
	} 

	sortByLngName(a,b){
		if (a.lng_name < b.lng_name)
			return -1;
		if (a.lng_name > b.lng_name)
			return 1;
		return 0;
	} 

	sortByLngNameDesc(a,b){
		if (a.lng_name < b.lng_name)
			return 1;
		if (a.lng_name > b.lng_name)
			return -1;
		return 0;
	} 

	sortEventHandle(id)
	{
		switch(id){
			case '1':{
				if(this.state.sortType==0){
					this.setState({sortType:1});
				}
				if(this.state.sortType==1){
					this.setState({sortType:0});
				}
				else
					this.setState({sortType:1});	

			}; break;
			case '2':{
				if(this.state.sortType==2){
					this.setState({sortType:3});
				}
				if(this.state.sortType==3){
					this.setState({sortType:2});
				}
				else
				this.setState({sortType:3});	
			}; break;

			case '3':{
				if(this.state.sortType==4){
					this.setState({sortType:5});
				}
				if(this.state.sortType==5){
					this.setState({sortType:4});
				}
				else
				this.setState({sortType:5});	
			} break;

			case '4':{
				if(this.state.sortType==6){
					this.setState({sortType:7});
				}
				if(this.state.sortType==7){
					this.setState({sortType:6});
				}
				else
				this.setState({sortType:7});	
			} break;

			default:
			window.alert('hello')

		}
	}

	searchEventHandle(event)
	{
		this.setState({filterBook:event.target.value})
		this.props.handleSearchEvent(event.target.value);
	}

	getCheckedBoxes(chkboxName) {
		var checkboxes = document.getElementsByName(chkboxName);
		var checkboxesChecked = [];

		for (var i=0; i<checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				checkboxesChecked.push(checkboxes[i].value);
			}
		}

		return checkboxesChecked.length > 0 ? checkboxesChecked : null;
	}

	getCheckEvent(event) {
		var result = confirm("Want to delete?");
		if (result) {
			var checkedBoxes = this.getCheckedBoxes("catchecks");
			if(checkedBoxes) this.props.handleDeleteEvent(checkedBoxes);
			else window.alert('Nothing selected');
		}
	}

	

	render(){	

		const books = this.props.booksToProps;
		const loading = this.props.loadingToProps;
		const error = this.props.errorToProps;
		const removedCategory = this.props.removedToProps.books;


		switch(this.state.sortType){
			case 0: books.sort(this.sortByBookID); break;
			case 1: books.sort(this.sortByBookIDDesc); break;
			case 2: books.sort(this.sortByBookName); break;
			case 3: books.sort(this.sortByBookNameDesc); break;
			case 4: books.sort(this.sortByCatName); break;
			case 5: books.sort(this.sortByCatNameDesc); break;
			case 6: books.sort(this.sortByLngName); break;
			case 7: books.sort(this.sortByLngNameDesc); break;
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

		return (
			<div>
			<h2>Books list : </h2>          
			<div className="row">
			<div className="col-md-4"><Link to="/book/new" className="form-control btn btn-primary"><span className="glyphicon glyphicon-plus"></span> Add</Link></div>		
			<div className="col-md-4"><button type="button "onClick={this.props.fetchData} className="form-control btn btn-primary"> <span className="glyphicon glyphicon-refresh"></span> Re-Load</button></div>
			<div className="col-md-4"><button type="button" onClick={this.getCheckEvent} className="form-control btn btn-warning"><span className="glyphicon glyphicon-remove"></span> Remove</button></div>
			</div>
			<br/>
			<div className="row">
			<div className="col-md-12">
			<input type="text" className="form-control" placeholder="Search" value={this.state.filterBook} onChange={this.searchEventHandle}/>
			</div>
			</div>
			<br/>

			{removedCategory ? <div className="alert alert-success"><strong>Success!</strong> Categories removed</div>:''}
			<table className="table">
			<thead>
			<tr>
			<th></th>
			<th onClick={()=>this.sortEventHandle('1')} className="nowrap col-md-1 text-center">ID {this.state.sortType==0 ? <span className="glyphicon glyphicon-arrow-down"></span>:''}{this.state.sortType==1 ? <span className="glyphicon glyphicon-arrow-up"></span>:''}</th>
			<th onClick={()=>this.sortEventHandle('2')}>Book Name {this.state.sortType==2 ? <span className="glyphicon glyphicon-arrow-down"></span>:''}{this.state.sortType==3 ? <span className="glyphicon glyphicon-arrow-up"></span>:''}</th>
			<th onClick={()=>this.sortEventHandle('3')}>Category {this.state.sortType==4 ? <span className="glyphicon glyphicon-arrow-down"></span>:''}{this.state.sortType==5 ? <span className="glyphicon glyphicon-arrow-up"></span>:''}</th>
			<th onClick={()=>this.sortEventHandle('4')}>Language {this.state.sortType==6 ? <span className="glyphicon glyphicon-arrow-down"></span>:''}{this.state.sortType==7 ? <span className="glyphicon glyphicon-arrow-up"></span>:''}</th>
			<th>Action</th>
			</tr>
			</thead>
			<tbody>
			{currentBooks.map(book=>(
				<tr key={book.book_id}>
				<td><input type="checkbox" name="catchecks" value={book.book_id || ''}/></td>
				<td className="text-center">{book.book_id}</td>
				<td><Link to={`/frontpage/${book.book_id}`}>{book.book_name}</Link></td>
				<td>{book.cat_name}</td>
				<td>{book.lng_name}</td>
				<td><Link to={`/book/new/${book.book_id}`} className="btn btn-info"> <span className="glyphicon glyphicon-edit"></span> Edit</Link></td>
				</tr>
				))}
			</tbody>
			</table>
			
			<PaginationFooter 
				pageNumbers = {pageNumbers}
				handleClick = {this.handleClick}
				currentPage = {this.state.currentPage}
				/>
			</div>
			)
	}

}