import React from 'react';
import {FrontPageCategories} from './FrontPageCategories';
import {FrontPageLanguages} from './FrontPageLanguages';


export class FrontPageSidebar extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return(
		<div>
		<FrontPageCategories
			categories = {this.props.categoriesToProps}
			catid = {this.props.catid}
			lngid = {this.props.lngid}
			/>
		<FrontPageLanguages
			lngs = {this.props.lngsToProps}
			lngid = {this.props.lngid}
			catid = {this.props.catid}
			/>
		
		</div>
		)	
	}
}
