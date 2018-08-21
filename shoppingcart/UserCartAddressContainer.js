import React from 'react';
import {connect} from 'react-redux';
import { removeCart,updateQtyAdd, updateQtyRemove } from './cartItems';
import { addOrder } from '../order/orders';
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
		removeCart:(item_id) => dispatch(removeCart(item_id)),
		updateQtyAdd:(item_id) => dispatch(updateQtyAdd(item_id)),
		updateQtyRemove:(item_id) => dispatch(updateQtyRemove(item_id)),
		addOrder:(items, address) => dispatch(addOrder(items, address))
	}
}


const mapStateToProps = (state) =>{
	return {
		cartItemsToProps:state.cartItem,
		orderToProps:state.order.newOrder
	}
}

class UserCartAddress extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			fullname:'',
			address1:'',
			address2:'',
			postcode:'',
			city:''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClickContinue = this.handleClickContinue.bind(this);
	}

	componentWillMount(){
		if(this.props.orderToProps.address)
		{
			this.setState({
			fullname : this.props.orderToProps.address.fullname,
			address1 : this.props.orderToProps.address.address1,
			address2 : this.props.orderToProps.address.address2,
			postcode : this.props.orderToProps.address.postcode,
			city : this.props.orderToProps.address.city
			})
			
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

	handleClickContinue(event){
		if(!this.state.fullname || 
		   !this.state.address1 || 
		   !this.state.address2 ||
		   !this.state.postcode ||
		   !this.state.city)
		{
			window.alert('You have to fill all fields!');
			return;
		}

		const address={
			fullname:this.state.fullname,
			address1:this.state.address1,
			address2:this.state.address2,
			postcode:this.state.postcode,
			city:this.state.city
		}

		this.props.addOrder(this.props.cartItemsToProps, address);

		hashHistory.push('/shippingconfirmation');
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

		return (
			<div className="row">
			<div className="col-md-12">
			
			<div className="col-md-6">
			<h2>Shipping address</h2>
			<br/>
			<div className="form-group col-md-12">
			<label htmlFor="Email">Full Name :</label>
			<input name="fullname" type="text" value={this.state.fullname || ''} onChange={this.handleInputChange} className="form-control" />
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Address 1 :</label>
			<input name="address1" type="text" value={this.state.address1 || ''} onChange={this.handleInputChange} className="form-control" />
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Address 2 :</label>
			<input name="address2" type="text" value={this.state.address2 || ''} onChange={this.handleInputChange} className="form-control" />
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Email">Post Code :</label>
			<input name="postcode" type="text" value={this.state.postcode || ''} onChange={this.handleInputChange} className="form-control" />
			</div>

			<div className="form-group col-md-12">
			<label htmlFor="Password">City :</label>
			<input name="city" type="text" value={this.state.city || ''} onChange={this.handleInputChange} className="form-control" />
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
			<div className="col-md-6"><button type="button" className="btn btn-success form-control"  onClick={this.handleClickContinue}> Continue  <span className="glyphicon glyphicon-chevron-right"></span></button></div>
			</div>
			)
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(UserCartAddress)