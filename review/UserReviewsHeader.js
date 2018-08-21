import React from 'react';
var divStyle={
	paddingLeft:0,
	paddingRight:0,
	marginBottom:8
}
var starStyle={
	color:	'#FFA500',
	fontSize : '25px',
	fontWeight:'bold'

}
var divStyleBottom = {
  paddingBottom: 15
};

function roundTo(n, digits) {
     if (digits === undefined) {
       digits = 0;
     }

     var multiplicator = Math.pow(10, digits);
     n = parseFloat((n * multiplicator).toFixed(11));
     var test =(Math.round(n) / multiplicator);
     return +(test.toFixed(digits));
   }

export class UserReviewsHeader extends React.Component{

	render(){
		const all_length = this.props.reviews.length;
		const point0array = this.props.reviews.filter((review)=>review.review_score==0);
		const point1array = this.props.reviews.filter((review)=>review.review_score==1);
		const point2array = this.props.reviews.filter((review)=>review.review_score==2);
		const point3array = this.props.reviews.filter((review)=>review.review_score==3);
		const point4array = this.props.reviews.filter((review)=>review.review_score==4);
		const point5array = this.props.reviews.filter((review)=>review.review_score==5);

		var summary_value = 0;
		for(var i=0; i<this.props.reviews.length; i++)
		{
			summary_value = summary_value + this.props.reviews[i].review_score;
		}

		var summary_value_point = roundTo((summary_value / all_length),2);


		
		const value5 = Math.round(point5array.length*100/all_length);
		const pointStyle5=value5?{width:value5+'%'}:{width:0+'%'}
		const value4 = Math.round(point4array.length*100/all_length);
		const pointStyle4=value4?{width:value4+'%'}:{width:0+'%'}
		const value3 = Math.round(point3array.length*100/all_length);
		const pointStyle3=value3?{width:value3+'%'}:{width:0+'%'}
		const value2 = Math.round(point2array.length*100/all_length);
		const pointStyle2=value2?{width:value2+'%'}:{width:0+'%'}
		const value1 = Math.round(point1array.length*100/all_length);
		const pointStyle1=value1?{width:value1+'%'}:{width:0+'%'}
		const value0 = Math.round(point0array.length*100/all_length);
		const pointStyle0=value0?{width:value0+'%'}:{width:0+'%'}

		return(
			<div className="col-md-8">
			<div className="col-md-12" style={divStyleBottom}>
			{(summary_value_point>=0)&&(summary_value_point <=0.50)?(<span style={starStyle}><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span></span>):''}
			{(summary_value_point>=0.51)&&(summary_value_point <=1.50)?(<span style={starStyle}><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span></span>):''}
			{(summary_value_point>=1.51)&&(summary_value_point <=2.50)?(<span style={starStyle}><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span></span>):''}
			{(summary_value_point>=2.51)&&(summary_value_point <=3.50)?(<span style={starStyle}><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span></span>):''}
			{(summary_value_point>=3.51)&&(summary_value_point <=4.50)?(<span style={starStyle}><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star-empty"></span></span>):''}
			{(summary_value_point>=4.51)&&(summary_value_point <=5.50)?(<span style={starStyle}><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span></span>):''}
			{all_length} reviews, <b>({summary_value_point ||'No available'} out of 5 starts)</b>
			</div>
			
			<div className="col-md-12">
			<div className ="col-md-2">
			<small>5 stars</small>
			</div>
			<div className="progress col-md-8" style={divStyle}>
			<div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={value5} aria-valuemin="0" aria-valuemax="100" style={pointStyle5}>
			</div>
			</div>
			<div className ="col-md-2">
			<small>{all_length!=0?Math.round(point5array.length*100/all_length)||'0':'0'}%</small>
			</div>
			</div>

			<div className="col-md-12">
			<div className ="col-md-2">
			<small>4 stars</small>
			</div>
			<div className="progress col-md-8" style={divStyle}>
			<div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={value4} aria-valuemin="0" aria-valuemax="100" style={pointStyle4}>
			</div>
			</div>
			<div className ="col-md-2">
			<small>{all_length!=0?Math.round(point4array.length*100/all_length)||'0':'0'}%</small>
			</div>
			</div>

			<div className="col-md-12">
			<div className ="col-md-2">
			<small>3 stars</small>
			</div>
			<div className="progress col-md-8" style={divStyle}>
			<div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={value3} aria-valuemin="0" aria-valuemax="100" style={pointStyle3}>
			</div>
			</div>
			<div className ="col-md-2">
			<small>{all_length!=0?Math.round(point3array.length*100/all_length)||'0':'0'}%</small>
			</div>
			</div>

			<div className="col-md-12">
			<div className ="col-md-2">
			<small>2 stars</small>
			</div>
			<div className="progress col-md-8" style={divStyle}>
			<div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={value2} aria-valuemin="0" aria-valuemax="100" style={pointStyle2}>
			</div>
			</div>
			<div className ="col-md-2">
			<small>{all_length!=0?Math.round(point2array.length*100/all_length)||'0':'0'}%</small>
			</div>
			</div>

			<div className="col-md-12">
			<div className ="col-md-2">
			<small>1 stars</small>
			</div>
			<div className="progress col-md-8" style={divStyle}>
			<div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={value1} aria-valuemin="0" aria-valuemax="100" style={pointStyle1}>
			</div>
			</div>
			<div className ="col-md-2">
			<small>{all_length!=0?Math.round(point1array.length*100/all_length)||'0':'0'}%</small>
			</div>
			</div>

			<div className="col-md-12">
			<div className ="col-md-2">
			<small>0 stars</small>
			</div>
			<div className="progress col-md-8" style={divStyle}>
			<div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={value0} aria-valuemin="0" aria-valuemax="100" style={pointStyle0}>
			</div>
			</div>
			<div className ="col-md-2">
			<small>{all_length!=0?Math.round(point0array.length*100/all_length) ||'0':'0'}%</small>
			</div>
			</div>

			</div>
			)
	}
}
