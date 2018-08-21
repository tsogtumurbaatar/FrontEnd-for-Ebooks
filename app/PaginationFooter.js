import React from 'react';

class PaginationFooter extends React.Component{

	render()
	{
		return (
			<nav className="text-center">
			<ul className="pagination">
			{this.props.pageNumbers.map((number) => (
				
			<li key={number} className={this.props.currentPage==number?'page-item active':'page-item'}>
				<a className="page-link" onClick={this.props.handleClick}  id={number}>	            
				{number}
				</a>
				</li>
				))}
			
			</ul>
			</nav>
			)
	}	
}

export default PaginationFooter