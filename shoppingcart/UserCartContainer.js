import React from 'react';
import {connect} from 'react-redux';
import { removeCart } from './cartItems';
import { Link } from 'react-router';



const mapDispatchToProps = (dispatch) =>{
	return {
		removeCart:(item_id) => { dispatch(removeCart(item_id))}
	}
}


const mapStateToProps = (state) =>{
	return {
		cartItemsToProps:state.cartItem
	}
}

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

class UserCartMenu extends React.Component{
	render()
	{
		return (
			<div className="dropdown">
			<button className="dropbtn"><span className="glyphicon glyphicon-shopping-cart"></span> Shopping cart (<b>{this.props.cartItemsToProps.length}</b>)</button>
			<div className="dropdown-content">
			{this.props.cartItemsToProps.length==0?'The shopping cart is empty':''}
			
			{this.props.cartItemsToProps.map((item)=>(
				
				<div className="row" key={item.id} style={divStyle1}>
				<div className="col-md-2"><img src={item.book.book_img1} width="50px" /></div>
				<div className="col-md-8">{item.book.book_name}</div>
				<div className="col-md-1">{item.qty}</div>
				<div className="col-md-1"><a><span className="glyphicon glyphicon-remove" style={styles} onClick={()=>this.props.removeCart(item.id)}></span></a>
				</div>
				</div>
				
				)

			)}
			{this.props.cartItemsToProps.length!=0?(<Link to="/cart">Go to Shopping Cart</Link>):''}

			</div>
			</div>
			)
	}
}

export const UserCartContainer =  connect( 
	mapStateToProps,
	mapDispatchToProps
	)(UserCartMenu)