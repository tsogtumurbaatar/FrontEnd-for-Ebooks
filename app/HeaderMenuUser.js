import React from 'react';
import {connect} from 'react-redux';
import { logoutUser } from '../user/users';
import {resetCart} from '../shoppingcart/cartItems';
import { Link } from 'react-router';
import {UserCartContainer} from '../shoppingcart/UserCartContainer'; 
import { hashHistory } from 'react-router';
var divStyleBottom = {
  paddingBottom: 7,
  paddingTop:7
};

const mapDispatchToProps = (dispatch) =>{
	return {
		logoutUser:() => dispatch(logoutUser()),
		resetCart:() => dispatch(resetCart())
	}
}


const mapStateToProps = (state) =>{
	return {
		userToProps:state.user
	}
}

class HeaderMenuUserComponent extends React.Component{
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout()
	{
		var result = confirm("Want to Logout?");
		if (result) {
		this.props.logoutUser();
		this.props.resetCart();
		hashHistory.push('/');
		}
	}

	render()
	{
		if(this.props.userToProps.status!='authenticated')
			return (
				<ul className="nav navbar-nav navbar-right">

				<li><Link to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
				<li><Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>

				<li><UserCartContainer /></li>
				</ul>
				)
		else
			return (
				<ul className="nav navbar-nav navbar-right">
				<li className="dropdown"><a>Settings <span className="caret"></span></a>
				<ul className="dropdown-content1 dropdown-menu">
				<li style={divStyleBottom}><Link to="/book">Books</Link></li>
				<li style={divStyleBottom}><Link to="/category">Category</Link></li>
				<li style={divStyleBottom}><Link to="/language">Language</Link></li>
				</ul>
				</li>

				<li className="dropdown"><a><span className="glyphicon glyphicon-user"></span> {this.props.userToProps.user.name} <span className="caret"></span></a>
				<ul className="dropdown-content1 dropdown-menu">
				<li style={divStyleBottom}><Link to="/dashboard"><span className="glyphicon glyphicon-home"></span> Dashboard</Link></li>
				<li style={divStyleBottom}><a onClick={this.handleLogout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
				</ul>
				</li>

				<li><UserCartContainer /></li>
				</ul>
				)

	}
}

export const HeaderMenuUser =  connect( 
	mapStateToProps,
	mapDispatchToProps
	)(HeaderMenuUserComponent)