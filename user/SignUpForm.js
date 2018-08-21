import React from 'react';
import { hashHistory } from 'react-router';

export class SignUpForm extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			name:'',
			email:'',
			pass:'',
			repass:''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onClickLogin = this.onClickLogin.bind(this);
	}

	onClickLogin(event){

		const newInput ={
			name:this.state.name,
			email:this.state.email,
			password:this.state.pass,
			c_password:this.state.repass
		}
		this.props.signUpUser(newInput);
	}

	componentWillReceiveProps(nextProps)
  	{
  		 if(nextProps.user.status=='authenticated')
  		 {
  		 	hashHistory.push('/dashboard');
  		 }
  	}	

	componentWillMount(){
		this.props.resetUser();
	}
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

	render()
	{
		if(this.props.user.loading) {
			return <div><h2>Logging to system</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} 
		
		return(
			<div className="col-md-6 col-md-offset-3">
			<br/><br/>
			<h2>Registration</h2>
			<br/>
			{this.props.user.error ? <div className="alert alert-danger">Error occured : {this.props.user.error.name? this.props.user.error.name.map((error)=>(error)) : ''}{this.props.user.error.email? this.props.user.error.email.map((error)=>(error)) : ''} {this.props.user.error.password? this.props.user.error.password.map((error)=>(error)): ''} {this.props.user.error.c_password? this.props.user.error.c_password.map((error)=>(error)): ''}</div>:''}
			<div className="form-group col-md-12">
			<label htmlFor="Email">Name :</label>
			<input name="name" type="text" value={this.state.name || ''} onChange={this.handleInputChange} className="form-control" />
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Email">Email :</label>
			<input name="email" type="text" value={this.state.email || ''} onChange={this.handleInputChange} className="form-control" />
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Password :</label>
			<input name="pass" type="password" value={this.state.pass || ''} onChange={this.handleInputChange} className="form-control" />
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="Password">Re-Password :</label>
			<input name="repass" type="password" value={this.state.repass || ''} onChange={this.handleInputChange} className="form-control" />
			</div>

			<div className="col-md-6"><button type="button" className="btn btn-info form-control"  onClick={()=>hashHistory.goBack()}><span className="glyphicon glyphicon-circle-arrow-left"></span> Go Back</button></div>
			<div className="col-md-6"><button type="button" className="form-control btn btn-success" onClick={this.onClickLogin} ><span className="glyphicon glyphicon-log-in"></span> Log Up </button></div>

			</div>
			)
	}	
}
