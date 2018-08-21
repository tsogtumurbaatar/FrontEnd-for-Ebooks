import React from 'react';
import { Link } from 'react-router';

var divStyle = {
	paddingBottom: 15
};

var styles = {
	color:'red',
	fontWeight:'bold'
};

export class FrontPageFilterBar extends React.Component{


	render(){
		var catlist = this.props.categories;
		const catName = catlist.filter(category=> category.cat_id == this.props.catid);

		var lnglist = this.props.lngs;
		const lngName = lnglist.filter(category=> category.lng_id == this.props.lngid);

		var catlink = '';
		if(this.props.catid!='showall')
			if(catName.length!=0)
			catlink = (<span>
				category:{catName[0].cat_name}
				<Link to={{pathname:'/frontpage' , query:{catid:'showall', lngid:this.props.lngid} }}>
				<span className="glyphicon glyphicon-remove" style={styles}></span>
				</Link>
				</span>)
		
		var lnglink = '';
		if(this.props.lngid!='showall')
			if(lngName.length!=0)
			lnglink = (<span>&nbsp;
				language:{lngName[0].lng_name}
				<Link to={{pathname:'/frontpage' , query:{catid:this.props.catid, lngid:'showall'} }}>
				<span className="glyphicon glyphicon-remove" style={styles}></span>
				</Link>
				</span>)

		var filterby = '';
		if((catlink!='')||(lnglink!='')) 
			{ filterby = (<div className="alert alert-success"><strong>Filtered by : </strong>{catlink} {lnglink}</div>) ;
			  
			}

		return(
			<div className="col-md-12" style={divStyle}>
			{filterby}
			
			</div>
		
		)
	}
}
