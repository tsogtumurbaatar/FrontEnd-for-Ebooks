import React from 'react';
import {connect} from 'react-redux';
import { fetchOrders } from '../order/orders';
import { Link, hashHistory } from 'react-router';

import { DashBoardItems } from './DashBoardItems';
import { DashBoardAddress } from './DashBoardAddress';

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
		fetchOrders:() => { dispatch(fetchOrders())}
	}
}


const mapStateToProps = (state) =>{
	return {
		cartItemsToProps:state.order.ordersList.orders,
		loading: state.order.ordersList.loading,
		userToProps:state.user
	}
}


class DashBoardComponent extends React.Component{
	componentWillMount()
	{
		if(this.props.userToProps.status!='authenticated')
		{
			hashHistory.push('/');
		}

		this.props.fetchOrders();
	}	

	render()
	{		
		if(this.props.loading) {
			return <div><h2>User order History</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} 
		
		return(
			<div className="row">
			<h1>
			Hello {this.props.userToProps.user?this.props.userToProps.user.name:''}!
			</h1>

			{this.props.cartItemsToProps.length==0?<h3>History is empty</h3>:''}

			{this.props.cartItemsToProps.map((item)=>(
				<div className="panel panel-info" key={item.order_id}>
				<div className="panel-heading"><span className="glyphicon glyphicon-shopping-cart"></span> My Order History (<b>{item.details.length}</b> items) - {item.created_at}</div>
				<div className="panel-body">
				<DashBoardAddress 
					fullname={item.ship_name}
					address1 = {item.ship_address1}
					address2 = {item.ship_address2}
					postcode = {item.ship_postcode}
					city = {item.ship_city}
					/>
				<DashBoardItems
					cartItemsToProps = {item.details}
					/>	
				</div>
				</div>	
				)
			)}	
			</div>
			)	
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(DashBoardComponent)