import React from 'react';
import { Link } from 'react-router';

export class FrontPageCategories extends React.Component{
	render(){
		
		return(
			<div className="panel panel-info">
			<div className="panel-heading">Book category</div>
			
			<div className="panel-body">
				<Link to={{pathname:'/frontpage' , query:{catid:'showall', lngid:this.props.lngid} }}>
				{this.props.catid=='showall'?(<b>Show All</b>):'Show All'}</Link>
				</div>
			{this.props.categories.map((category)=>
				<div className="panel-body" key={category.cat_id}>
				<Link to={{pathname:'/frontpage' , query:{catid:category.cat_id, lngid:this.props.lngid} }}>
				{this.props.catid==category.cat_id ? (<b>{category.cat_name}</b>): category.cat_name }
				</Link>
				</div>
				)
			}
			</div>
		
		)
	}
}
