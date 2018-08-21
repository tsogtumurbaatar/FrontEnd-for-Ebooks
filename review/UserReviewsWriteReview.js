import React from 'react';
import {UserReviewsHeader} from './UserReviewsHeader';

export class UserReviewsWriteReview extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showReview:'',
			review_title:'',
			review_body:'',
			review_score:0
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleCloseClick = this.handleCloseClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({[name]: value});
	}


	handleClick(event)
	{
		this.setState({showReview:1});
	}

	componentWillMount() {
		this.props.resetMeActive();
	}

	handleCloseClick(event)
	{
		this.setState({
			showReview:'',
			review_title : '',
			review_body : '',
			review_score : 0
		});
		this.props.resetMeActive();
	}

	handleAddClick(event)
	{
		if(this.state.review_title.length>124){window.alert('The size of a Title field is too long, maximum length is 124 characters'); return;}


		const newlng = {
			"book_id" : this.props.book_id,
			"review_title" : this.state.review_title,
			"review_body" : this.state.review_body,
			"review_score" : this.state.review_score,
			"user_id" : 1
		}
		this.props.handleAddEvent(newlng, this.props.book_id);
		
	}

	render(){
		if(this.props.newReview.loading) {
			return <div><h2>Inserting new review</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} else if(this.props.newReview.error) {
			return <div className="alert alert-danger">Error: {this.props.newReview.error.message}</div>
		}


		return(
			<div>
			<div className="col-md-12">
			<h3>Customer reviews</h3>
			</div>
			
			<UserReviewsHeader
			reviews = {this.props.reviews}
			/>

			<div className="col-md-4 form-group">
			<br/><br/>
			<b><small>Share your thoughts with other customers</small></b><br/><br/>
			<button type="button" className="btn btn-info form-control"  onClick={this.handleClick}><span className="glyphicon glyphicon-pencil"></span> Write a customer review</button>
			</div>
			

			<div className="col-md-12" style={{display: this.state.showReview ? 'block' : 'none' }}>
			{this.props.newReview.review ? <div className="alert alert-success col-md-12 form-group">Review added successfully</div>:''}
			
			<div className="form-group col-md-8">
			<label htmlFor="catdesc">Title:</label>
			<input  type="text" className="form-control" name="review_title" onChange={this.handleInputChange}  value={this.state.review_title || ''}/>
			</div>

			<div className="col-md-4 form-group">	
			<label htmlFor="catname">Review score:</label>
			<select className="form-control" name="review_score" value={this.state.review_score || '0'} onChange={this.handleInputChange} >
			<option value="0">0</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			</select>		
			</div>
			

			<div className="form-group col-md-12">
			<label htmlFor="catdesc">Body:</label>
			<textarea className="form-control" rows="5" name="review_body" onChange={this.handleInputChange} value={this.state.review_body || ''}></textarea>
			</div>

			<div className="form-group col-md-6">
			<input type="button" onClick={this.handleAddClick}  className="btn btn-primary form-control" value="Add Review"/>
			</div>

			<div className="form-group col-md-6">
			<input type="button" onClick={this.handleCloseClick}  className="btn btn-warning form-control" value="Cancel Review" />
			</div>

			</div>
			</div>

			)
	}
}
