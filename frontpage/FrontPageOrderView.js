import React from 'react';

var iconStyleActive = {
	fontSize: 25,
	color: '#2E86C1'
}
var iconStyle = {
	fontSize: 25,
	color: '#C0C0C0'
}

export class FrontPageOrderView extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			viewOrder :0
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event)
	{
		this.props.setViewOrder(event.target.value);
		this.setState({viewOrder:event.target.value});
	}

	render(){
		return(
			<div className="col-md-5">
			<div className="col-md-8">
			<select className="form-control" onChange={this.handleChange} value={this.state.viewOrder}>
			<option value="0">Featured</option>
			<option value="1">Price: Low to High</option>
			<option value="2">Price: High to Low</option>
			<option value="3">Avg. Customer Review</option>
			<option value="4">Most reviews</option>
			</select>
			</div>
			<div className="col-md-4">
			<a onClick={()=>this.props.setViewOption(0)}><span className="glyphicon glyphicon-th-large" style={this.props.viewOption==0?iconStyleActive:iconStyle}></span></a>&nbsp;&nbsp;
			<a onClick={()=>this.props.setViewOption(1)}><span className="glyphicon glyphicon-th-list" style={this.props.viewOption==1?iconStyleActive:iconStyle}></span></a>
			</div>
			</div>
			)
	}
}
