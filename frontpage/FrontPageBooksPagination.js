import React from 'react';
import PaginationFooter from '../app/PaginationFooter';

export class FrontPageBooksPagination extends React.Component{
	render(){
		return(
			<div className="col-md-12">
				<PaginationFooter 
				pageNumbers = {this.props.pageNumbers}
				handleClick = {this.props.handleClick}
				currentPage = {this.props.currentPage}
				/>
			</div>
		
		)
	}
}
