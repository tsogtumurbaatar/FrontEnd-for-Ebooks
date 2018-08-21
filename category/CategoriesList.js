import React from 'react';
import { Link } from 'react-router';
import PaginationFooter from '../app/PaginationFooter';


export class CategoriesList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			categoriesPerPage: 10,
			sortType:0
		}
		this.getCheckEvent = this.getCheckEvent.bind(this);
		this.searchEventHandle = this.searchEventHandle.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.sortEventHandle = this.sortEventHandle.bind(this);
	}

	componentWillMount() {
		this.props.resetMe();
	}

	handleClick(event){
		this.setState({currentPage:Number(event.target.id)});
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

	sortByCatID(a,b){
		if (a.cat_id < b.cat_id)
			return -1;
		if (a.cat_id > b.cat_id)
			return 1;
		return 0;
	} 

	sortByCatIDDesc(a,b){
		if (a.cat_id < b.cat_id)
			return 1;
		if (a.cat_id > b.cat_id)
			return -1;
		return 0;
	} 

	sortByCatDesc(a,b){
		if (a.cat_desc < b.cat_desc)
			return -1;
		if (a.cat_desc > b.cat_desc)
			return 1;
		return 0;
	} 

	sortByCatDescDesc(a,b){
		if (a.cat_desc < b.cat_desc)
			return 1;
		if (a.cat_desc > b.cat_desc)
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

			default:
			window.alert('hello')

		}
	}

	searchEventHandle(event)
	{
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
		const categories = this.props.categoriesToProps;
		const loading = this.props.loadingToProps;
		const error = this.props.errorToProps;
		const removedCategory = this.props.removedToProps.categories;

		var func;
		switch(this.state.sortType){
			case 0: categories.sort(this.sortByCatID); break;
			case 1: categories.sort(this.sortByCatIDDesc); break;
			case 2: categories.sort(this.sortByCatName); break;
			case 3: categories.sort(this.sortByCatNameDesc); break;
			case 4: categories.sort(this.sortByCatDesc); break;
			case 5: categories.sort(this.sortByCatDescDesc); break;
			default:
		}

			

		const indexOfLastCategory = this.state.currentPage * this.state.categoriesPerPage;
		const indexOfFirstCategory = indexOfLastCategory - this.state.categoriesPerPage;
		const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(categories.length / this.state.categoriesPerPage); i++) {
			pageNumbers.push(i);
		}

		if(loading) {
			return <div><h2>Categories list : </h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} else if(error) {
			return <div className="alert alert-danger">Error: {error.message}</div>
		} 

		return (
			<div>
			<h2>Categories list : </h2>          
			<div className="row">
			<div className="col-md-4"><Link to="/category/new" className="form-control btn btn-primary"><span className="glyphicon glyphicon-plus"></span> Add</Link></div>		
			<div className="col-md-4"><button type="button "onClick={this.props.fetchData} className="form-control btn btn-primary"> <span className="glyphicon glyphicon-refresh"></span> Re-Load</button></div>
			<div className="col-md-4"><button type="button" onClick={this.getCheckEvent} className="form-control btn btn-warning"><span className="glyphicon glyphicon-remove"></span> Remove</button></div>
			</div>
			<br/>
			<div className="row">
			<div className="col-md-12">
			<input type="text" className="form-control" placeholder="Search" onChange={this.searchEventHandle}/>
			</div>
			</div>
			<br/>

			{removedCategory ? <div className="alert alert-success"><strong>Success!</strong> Categories removed</div>:''}
			<table className="table">
			<thead>
			<tr>
			<th>Check</th>
			<th onClick={()=>this.sortEventHandle('1')}>Category ID {this.state.sortType==0 ? <span className="glyphicon glyphicon-arrow-down"></span>:''}{this.state.sortType==1 ? <span className="glyphicon glyphicon-arrow-up"></span>:''}</th>
			<th onClick={()=>this.sortEventHandle('2')}>Category Name {this.state.sortType==2 ? <span className="glyphicon glyphicon-arrow-down"></span>:''}{this.state.sortType==3 ? <span className="glyphicon glyphicon-arrow-up"></span>:''}</th>
			<th onClick={()=>this.sortEventHandle('3')}>Category Description {this.state.sortType==4 ? <span className="glyphicon glyphicon-arrow-down"></span>:''}{this.state.sortType==5 ? <span className="glyphicon glyphicon-arrow-up"></span>:''}</th>
			<th>Action</th>
			</tr>
			</thead>
			<tbody>
			{currentCategories.map(category=>(
				<tr key={category.cat_id}>
				<td><input type="checkbox" name="catchecks" value={category.cat_id}/></td>
				<td>{category.cat_id}</td>
				<td>{category.cat_name}</td>
				<td>{category.cat_desc}</td>
				<td><Link to={`/category/new/${category.cat_id}`} className="btn btn-info"> <span className="glyphicon glyphicon-edit"></span> Edit</Link></td>
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