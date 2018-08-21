import React from 'react';
import { Link } from 'react-router';


export class CategoryForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			cat_name : '',
			cat_desc : ''
		}
		this.counter = 0; 
		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }


	componentWillMount() {
    this.props.resetMe();
    this.props.resetMeActive();

    if(this.props.catidToProps)
    	this.props.fetchCategory(this.props.catidToProps);
  	}

  	componentWillReceiveProps(nextProps)
  	{
  		 if(nextProps.activeCategoryToProps.category)
  		{
  			this.setState({
  			cat_name : nextProps.activeCategoryToProps.category.cat_name,
			cat_desc : nextProps.activeCategoryToProps.category.cat_desc,
			})
  		}
  	}

  	handleSaveEvent(event)
	{
	if(this.props.catidToProps)
		{
		const editedlng = {
		"cat_id" : this.props.catidToProps,
		"cat_name" : this.state.cat_name,
		"cat_desc" : this.state.cat_desc	
	}
		this.props.handleSaveEvent(editedlng);
		}	
	}

	handleAddEvent(event)
	{	
		if(this.state.cat_name.length>64){window.alert('The size of a name field is too long, maximum length is 64 characters'); return;}
		if(this.state.cat_desc.length>124){window.alert('The size of a description field is too long, maximum length is 124 characters'); return;}

		const newlng = {
		"cat_name" : this.state.cat_name,
		"cat_desc" : this.state.cat_desc
		}

	 this.props.handleAddEvent(newlng);	
	}

	render()
	{	
	
	if(this.props.newCategoryToProps.loading) {
      return <div><h2>Add a new category</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
    } else if(this.props.newCategoryToProps.error) {
      return <div className="alert alert-danger">Error: {this.props.newCategoryToProps.error.message}</div>
    }

    if(this.props.activeCategoryToProps.loading) {
      return <div><h2>Editing category</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
    } else if(this.props.activeCategoryToProps.error) {
      return <div className="alert alert-danger">Error: {this.props.activeCategoryToProps.error.message}</div>
    }

    var subbutton;
    if(this.props.activeCategoryToProps.category)
    subbutton = (<button type="submit" className="btn btn-success form-control"  onClick={()=>this.handleSaveEvent()}><span className="glyphicon glyphicon-ok"></span> Save Category</button>)
	else
    subbutton = (<button type="submit" className="btn btn-success form-control"  onClick={()=>this.handleAddEvent()}><span className="glyphicon glyphicon-ok"></span> Add Category</button>)
		
		
		return(
			<div className="row">
			<h2>{this.props.activeCategoryToProps.category ? 'Category Edit :':'Category Add'} </h2>    
			{this.props.activeCategoryToProps.updated ? <div className="alert alert-success"><strong>Success!</strong> The Category edited, ID - {this.props.activeCategoryToProps.category.cat_id}</div>:''}
			{this.props.newCategoryToProps.category ? <div className="alert alert-success"><strong>Success!</strong> The Category added, ID - {this.props.newCategoryToProps.category.cat_id}</div>:''}
			
			<div className="form-group col-md-12">
			<label htmlFor="catname">Category name:</label>
			<input type="text" className="form-control" name="cat_name" onChange={this.handleInputChange} value={this.state.cat_name || ''}/>
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="catdesc">Category description:</label>
			<input  type="text" className="form-control" name="cat_desc" onChange={this.handleInputChange}  value={this.state.cat_desc || ''}/>
			</div>
			
			<div className="col-md-6 form-group">	
			<Link to="/category" className="btn btn-danger form-control"><span className="glyphicon glyphicon-share"></span> Go back</Link>
			</div>
			<div className="col-md-6 form-group">	
			{subbutton}
			</div>
			
			</div>
			)
	
}

}


