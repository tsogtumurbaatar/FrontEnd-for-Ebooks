import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import {HeaderMenuUser} from './HeaderMenuUser'; 

class App extends React.Component {
	render()
	{
		return(
			<div className="col-md-12">
			<nav className="navbar navbar-default">
			<div className="container-fluid">
			<div className="navbar-header">
			<a className="navbar-brand" href="#"><img src="images/book-stack-48.png" width="30px"/></a>
			</div>
			<ul className="nav navbar-nav">
			{this.props.location.pathname=='/'?<li className="active"><IndexLink to="/">Home</IndexLink></li>:<li><IndexLink to="/">Home</IndexLink></li>}
			{this.props.location.pathname=='/frontpage'?<li className="active"><Link to="/frontpage">BookStore</Link></li>:<li><Link to="/frontpage">BookStore</Link></li>}
			</ul>
			
			<HeaderMenuUser />
			</div>
			</nav>			

			{this.props.children}

			<div className="row">
			<div className="col-md-3">{this.props.sidebar}</div>
			<div className="col-md-9">{this.props.main}</div>

			</div>
			</div>
			)
	}
}

App.propsTypes = {
	children:PropTypes.object.isRequired
};

export default App;