import React from 'react';
import { Link } from 'react-router';

export class FrontPageLanguages extends React.Component{
	constructor(props)
	{
		super(props);
		
	}

	render(){
		return(
			<div className="panel panel-success">
			<div className="panel-heading">Book Language</div>
			<div className="panel-body" >
			<Link to={{pathname:'/frontpage' , query:{lngid:'showall', catid:this.props.catid} }}>
			{this.props.lngid=='showall'?(<b>Show All</b>):'Show All'}
			</Link>
			</div>

			{this.props.lngs.map((lng)=>
				<div className="panel-body" key={lng.lng_id}>
				<Link to={{pathname:'/frontpage' , query:{lngid:lng.lng_id, catid:this.props.catid} }}>
				{this.props.lngid==lng.lng_id ? (<b>{lng.lng_name}</b>): lng.lng_name }
				</Link>
				</div>
				)
		}
		</div>
		)
	}
}
