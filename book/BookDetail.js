import React from 'react';
import {UserReviewsConn} from '../review/UserReviews';
import { Link, hashHistory } from 'react-router';


var divStyle = {
	paddingBottom: 15
};

export class BookDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			book:{},
			quantity:1
		}
		this.onClickMinus = this.onClickMinus.bind(this);
		this.onClickPlus = this.onClickPlus.bind(this);
		this.onClickAddCart = this.onClickAddCart.bind(this);
		
	}

	componentWillMount() {
		if(this.props.bookidToProps)
			this.props.fetchBook(this.props.bookidToProps);
	}

	
	componentWillReceiveProps(nextProps)
	{
		if(nextProps.activeBookToProps.book)
		{
			this.setState({book : nextProps.activeBookToProps.book})
		}
	}

	onClickMinus(event)
	{
		if(this.state.quantity>1)
		this.setState({quantity:this.state.quantity-1});
	}

	onClickPlus(event)
	{
		if(this.state.quantity>0)
		this.setState({quantity:this.state.quantity+1});
	}

	onClickAddCart(event)
	{
		this.props.addCart(this.state.book, this.state.quantity);
		window.alert('Product added to Shopping cart')
	}

	

	render()
	{
		if(this.props.activeBookToProps.loading) {
			return <div><h2>Editing book</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} else if(this.props.activeBookToProps.error) {
			return <div className="alert alert-danger">Error: {this.props.activeBookToProps.error.message}</div>
		}

		var images=[];
		if(this.state.book.book_img2!='images.jpg') images.push(<div className="col-md-4" key={Math.random()}><a href={this.state.book.book_img2} target="_blank"><img src={this.state.book.book_img2} width="50"/></a></div>)
		if(this.state.book.book_img3!='images.jpg') images.push(<div className="col-md-4" key={Math.random()}><a href={this.state.book.book_img3} target="_blank"><img src={this.state.book.book_img3} width="50"/></a></div>)
		if(this.state.book.book_img4!='images.jpg') images.push(<div className="col-md-4" key={Math.random()}><a href={this.state.book.book_img4} target="_blank"><img src={this.state.book.book_img4} width="50"/></a></div>)

					return(
						<div className="row">
						<div className="col-md-4">
						<div className="col-md-12">
						<br/><a href={this.state.book.book_img1} target="_blank"><img src={this.state.book.book_img1} width="200" style={divStyle} /></a>
						</div>
						<div className="col-md-12">
						{images}
						</div>
						<div className="col-md-12">
						<br/><br/>

						<div className="row">
						<div className="col-md-4"> Qty : </div>
						<div className="col-md-2"><a onClick={this.onClickMinus}><span className="glyphicon glyphicon-minus"></span></a></div> 	
						<div className="col-md-4"><input type="text" value={this.state.quantity} readOnly className="form-control"/></div> 
						<div className="col-md-2"><a onClick={this.onClickPlus}><span className="glyphicon glyphicon-plus"></span></a></div> 
						</div>
						<br/>
						<button type="button" className="btn btn-danger form-control"  onClick={this.onClickAddCart}><span className="glyphicon glyphicon-shopping-cart"></span> Add to Shopping Cart</button>
						<br/><br/>
						<button type="button" className="btn btn-info form-control"  onClick={()=>hashHistory.goBack()}><span className="glyphicon glyphicon-circle-arrow-left"></span> Go Back</button>
		
						</div>

						</div>
						<div className="col-md-8">

						<div className="col-md-12">
						<h2>{this.state.book.book_name}</h2>
						</div>

						<div className="col-md-12" style={divStyle}>
						by <b>{this.state.book.book_author}</b>
						</div>

						<div className="col-md-6" style={divStyle}>
						Sale: {this.state.book.book_price1}$
						</div>

						<div className="col-md-6" style={divStyle}>
						Price: {this.state.book.book_price2}$
						</div>

						<div className="col-md-12" style={divStyle}>
						Category: <b>{this.state.book.cat_name}</b>
						</div>

						<div className="col-md-12" style={divStyle}>
						Language: <b>{this.state.book.lng_name}</b>
						</div>

						<div className="col-md-12" style={divStyle}>
						<b>{this.state.book.book_motto}</b>
						</div>
						<div className="col-md-12" style={divStyle} >
						<div dangerouslySetInnerHTML={{__html: this.state.book.book_desc}} />
						</div>

						<div className="col-md-12" style={divStyle}>
						ISBN: <b>{this.state.book.book_isbn}</b>
						</div>

						<div className="col-md-12" style={divStyle}>
						Publisher: <b>{this.state.book.book_publisher}</b>
						</div>

						</div>

						<UserReviewsConn
						book_id = {this.state.book.book_id}
						/>			


						</div>
						)
			}


		}