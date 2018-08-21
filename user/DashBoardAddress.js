import React from 'react';


export class DashBoardAddress extends React.Component{
	render()
	{
			return (
			<div className="col-md-4">
			<h3>Shipping address</h3>
			<br/>
			<div className="form-group col-md-12">
			<label htmlFor="Email">Full Name :</label>
			{this.props.fullname}
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Address 1 :</label>
			{this.props.address1}
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Address 2 :</label>
			{this.props.address2}
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Email">Post Code :</label>
			{this.props.postcode}
			</div>

			<div className="form-group col-md-12">
			<label htmlFor="Password">City :</label>
			{this.props.city}
			</div>
			</div>
			)
	}
}
