import React from 'react';
import { Link  } from 'react-router';

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



export class DashBoardItems extends React.Component{
	render()
	{
		var header = '';
		if(this.props.cartItemsToProps.length!=0)
			header = (<div className="row" style={divStyle1}>
				<div className="col-md-7 text-center"><b>Book Name</b></div>
				<div className="col-md-2 text-center"><b>QTY</b></div>
				<div className="col-md-1 text-center"><b>Price</b></div>
				<div className="col-md-2 text-center"><b>Summary</b></div>
				</div>
			);
		var qty =0 ,sum = 0;
		if(this.props.cartItemsToProps.length!=0)
		{
			for(var i=0; i<this.props.cartItemsToProps.length; i++)
				{
					qty = qty + this.props.cartItemsToProps[i].qty;
					sum = sum + this.props.cartItemsToProps[i].qty * this.props.cartItemsToProps[i].book_price2;
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
			<div className="col-md-8">
			{this.props.cartItemsToProps.length==0?<a>The cart is empty</a>:''}
	
			{header}
			{this.props.cartItemsToProps.map((item)=>(
				<div className="row" key={item.detail_id} style={divStyle1}>
				<div className="col-md-2 text-center"><Link to={`/frontpage/${item.book_id}`}><img src={item.book_img1} width="75px" /></Link></div>
				<div className="col-md-5"><Link to={`/frontpage/${item.book_id}`}> {item.book_name}</Link></div>
				<div className="col-md-2 text-center"> {item.qty} </div>
				<div className="col-md-1 text-center">${item.book_price2}</div>
				<div className="col-md-2 text-center">${item.qty*item.book_price2} </div>
				</div>
				)
			)}	
			{footer}
			</div>

			)
	}
}