import React from 'react';
const imgStyle ={
	 margin: '0 auto'
}


class IndexPage extends React.Component{

	render()
	{
		return(
			<div>	
			<img className="img-responsive" style={imgStyle} src="images/index.jpg"/>
			</div>
			)
	}	
}

export default IndexPage