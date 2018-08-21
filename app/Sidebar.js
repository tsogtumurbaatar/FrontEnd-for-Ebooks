import React from 'react';
import FrontPageSidebarContainer from '../frontpage/FrontPageSidebarContainer';

class Sidebar extends React.Component{

	render()
	{
		return <FrontPageSidebarContainer 
							catid={this.props.location.query.catid?this.props.location.query.catid:'showall'}
							lngid={this.props.location.query.lngid?this.props.location.query.lngid:'showall'}
					/>
	}	
}

export default Sidebar