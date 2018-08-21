import React from 'react';
import { Link } from 'react-router';
import request from 'superagent';

export class LanguageForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			lng_name : '',
			lng_desc : ''
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

    if(this.props.lngidToProps)
    	this.props.fetchLanguage(this.props.lngidToProps);
  	}

  	componentWillReceiveProps(nextProps)
  	{
  		 if(nextProps.activeLngToProps.lng)
  		{
  			this.setState({
  			lng_name : nextProps.activeLngToProps.lng.lng_name,
			lng_desc : nextProps.activeLngToProps.lng.lng_desc,
			})
  		}
  	}

  	handleSaveEvent(event)
	{
	if(this.props.lngidToProps)
		{
		const editedlng = {
		"lng_id" : this.props.lngidToProps,
		"lng_name" : this.state.lng_name,
		"lng_desc" : this.state.lng_desc	
	}
		this.props.handleSaveEvent(editedlng);
		}	
	}

	handleAddEvent(event)
	{	
		if(this.state.lng_name.length>64){window.alert('The size of a name field is too long, maximum length is 64 characters'); return;}
		if(this.state.lng_desc.length>124){window.alert('The size of a description field is too long, maximum length is 124 characters'); return;}

		const newlng = {
		"lng_name" : this.state.lng_name,
		"lng_desc" : this.state.lng_desc
		}

	 this.props.handleAddEvent(newlng);	
	}

	render()
	{	
	
	if(this.props.newLngToProps.loading) {
      return <div><h2>Add a new language</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
    } else if(this.props.newLngToProps.error) {
      return <div className="alert alert-danger">Error: {this.props.newLngToProps.error.message}</div>
    }

    if(this.props.activeLngToProps.loading) {
      return <div><h2>Editing language</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
    } else if(this.props.activeLngToProps.error) {
      return <div className="alert alert-danger">Error: {this.props.activeLngToProps.error.message}</div>
    }

    var subbutton;
    if(this.props.activeLngToProps.lng)
    subbutton = (<button type="submit" className="btn btn-success form-control"  onClick={()=>this.handleSaveEvent()}><span className="glyphicon glyphicon-ok"></span> Save Language</button>)
	else
    subbutton = (<button type="submit" className="btn btn-success form-control"  onClick={()=>this.handleAddEvent()}><span className="glyphicon glyphicon-ok"></span> Add Language</button>)
		
		
		return(
			<div className="row">
			<h2>{this.props.activeLngToProps.lng ? 'Language Edit :':'Language Add'} </h2>    
			{this.props.activeLngToProps.updated ? <div className="alert alert-success"><strong>Success!</strong> The Language edited, ID - {this.props.activeLngToProps.lng.lng_id}</div>:''}
			{this.props.newLngToProps.lng ? <div className="alert alert-success"><strong>Success!</strong> The Language added, ID - {this.props.newLngToProps.lng.lng_id}</div>:''}
			
			<div className="form-group col-md-12">
			<label htmlFor="catname">Language name:</label>
			<input type="text" className="form-control" name="lng_name" onChange={this.handleInputChange} value={this.state.lng_name || ''}/>
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="catdesc">Language description:</label>
			<input  type="text" className="form-control" name="lng_desc" onChange={this.handleInputChange}  value={this.state.lng_desc || ''}/>
			</div>
			
			<div className="col-md-6 form-group">	
			<Link to="/language" className="btn btn-danger form-control"><span className="glyphicon glyphicon-share"></span> Go back</Link>
			</div>
			<div className="col-md-6 form-group">	
			{subbutton}
			</div>
			
			</div>
			)
	
}

}


