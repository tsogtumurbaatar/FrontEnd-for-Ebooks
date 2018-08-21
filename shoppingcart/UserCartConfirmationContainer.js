import React from 'react';
import {connect} from 'react-redux';
import { removeCart,updateQtyAdd, updateQtyRemove,  resetCart  } from './cartItems';
import { saveOrder } from '../order/orders';
import { Link, hashHistory } from 'react-router';

var divStyle = {
	float:'right'
};

var styles = {
	color:'red',
	fontWeight:'bold'
};

var divStyle1 = {
  paddingBottom: 5
};

const mapDispatchToProps = (dispatch) =>{
	return {
		saveOrder:(items, address) => dispatch(saveOrder(items, address)),
		resetCart:() => dispatch(resetCart())
	}
}


const mapStateToProps = (state) =>{
	return {
		orderToProps:state.order.newOrder,
		cartItemsToProps : state.order.newOrder.items
	}
}

class UserCartConfirmation extends React.Component{
	constructor(props){
		super(props);
		this.handleClickContinue = this.handleClickContinue.bind(this);
	}

	handleClickContinue(event){
		
		this.props.saveOrder(this.props.cartItemsToProps, this.props.orderToProps.address);
		this.props.resetCart();
		hashHistory.push('/dashboard');

	}

	render()
	{
		
		var header = '';
		if(this.props.cartItemsToProps.length!=0)
			header = (<div className="row" style={divStyle1}>
				<div className="col-md-10 text-center"><b>Book Name</b></div>
				<div className="col-md-2 text-center"><b>QTY</b></div>
	
				</div>
			);
		var qty =0 ,sum = 0;
		if(this.props.cartItemsToProps.length!=0)
		{
			for(var i=0; i<this.props.cartItemsToProps.length; i++)
				{
					qty = qty + this.props.cartItemsToProps[i].qty;
					sum = sum + this.props.cartItemsToProps[i].qty * this.props.cartItemsToProps[i].book.book_price2;
				}	
		}

		var footer = '';
		if(this.props.cartItemsToProps.length!=0)
			footer = (<div className="row" style={divStyle1}>
				<div className='span12 col-md-12'><hr/></div>
				<div className="col-md-7 text-center"><b>Summary</b></div>
				<div className="col-md-3 text-center"><b>{qty} items</b></div>
				<div className="col-md-2 text-center"><b>${sum}</b></div>
				<div className="col-md-12">&nbsp;</div>
				</div>
			);
		
		if(this.props.orderToProps.loading) {
			return <div><h2>Saving the order</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} 
		
		return (
			<div className="row">
			<div className="col-md-12">
			<div className="alert alert-success">
  			<strong><h1>Order confirmation</h1></strong>
			</div>

			<div className="col-md-6">
			<h2>Shipping address</h2>
			<br/>
			<div className="form-group col-md-12">
			<label htmlFor="Email">Full Name :</label>
			{this.props.orderToProps.address.fullname}
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Address 1 :</label>
			{this.props.orderToProps.address.address1}
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Address 2 :</label>
			{this.props.orderToProps.address.address2}
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Email">Post Code :</label>
			{this.props.orderToProps.address.postcode}
			</div>

			<div className="form-group col-md-12">
			<label htmlFor="Password">City :</label>
			{this.props.orderToProps.address.city}
			</div>
			</div>


			<div className="col-md-6">
			<div className="panel panel-info">
			<div className="panel-heading"><span className="glyphicon glyphicon-shopping-cart"></span> My Shopping Cart (<b>{this.props.cartItemsToProps.length}</b> items)</div>
			
			<div className="panel-body">
			{this.props.cartItemsToProps.length==0?<a>The cart is empty</a>:''}
	
			
			{header}
			{this.props.cartItemsToProps.map((item)=>(
				<div className="row" key={item.id} style={divStyle1}>
				<div className="col-md-4 text-center"><Link to={`/frontpage/${item.book.book_id}`}><img src={item.book.book_img1} width="75px" /></Link></div>
				<div className="col-md-6"><Link to={`/frontpage/${item.book.book_id}`}> {item.book.book_name}</Link></div>
				<div className="col-md-2 text-center"> {item.qty} </div>
				</div>
				)
			)}	
			{footer}
			</div>
			</div>
			</div>
			
			</div>

			
			<div className="col-md-6"><button type="button" className="btn btn-info form-control"  onClick={()=>hashHistory.goBack()}><span className="glyphicon glyphicon-circle-arrow-left"></span> Go Back</button></div>
			<div className="col-md-6"><button type="button" className="btn btn-success form-control"  onClick={this.handleClickContinue}> Make a payment  <span className="glyphicon glyphicon-chevron-right"></span></button></div>
			<div className="col-md-12">&nbsp;</div>
			</div>

			)
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(UserCartConfirmation)