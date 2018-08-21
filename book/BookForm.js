import React from 'react';
import { Link } from 'react-router';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'gbdreain';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwomu2yfq/image/upload';

export class BookForm extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			files:[],
			imagePreviewUrl:['images.jpg','images.jpg','images.jpg','images.jpg'],
			uploadedFiles:[],
			downloadedFiles:[],
			book_name : '',
			book_desc : '',
			book_motto :'',
			book_isbn : '',
			book_publisher : '',
			book_author : '',
			book_price1 : '',
			book_price2 : '',
			cat_id : '',
			lng_id : ''
		}
		this.counter = 0; 
		this._handleImageChange = this._handleImageChange.bind(this);
		this._handleDelete = this._handleDelete.bind(this);
		this.handleAddEvent = this.handleAddEvent.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }


	componentWillMount() {
    this.props.resetMe();
    this.props.resetMeActive();

    if(this.props.bookidToProps)
    	this.props.fetchBook(this.props.bookidToProps);
  	}

  	componentWillReceiveProps(nextProps)
  	{
  		 if(nextProps.activeBookToProps.book)
  		{
  			this.setState({
  			book_name : nextProps.activeBookToProps.book.book_name,
			book_desc : nextProps.activeBookToProps.book.book_desc,
			book_motto :nextProps.activeBookToProps.book.book_motto,
			book_isbn : nextProps.activeBookToProps.book.book_isbn,
			book_publisher : nextProps.activeBookToProps.book.book_publisher,
			book_author : nextProps.activeBookToProps.book.book_author,
			book_price1 : nextProps.activeBookToProps.book.book_price1,
			book_price2 : nextProps.activeBookToProps.book.book_price2,
			cat_id : nextProps.activeBookToProps.book.cat_id,
			lng_id : nextProps.activeBookToProps.book.lng_id,
  			imagePreviewUrl: [nextProps.activeBookToProps.book.book_img1,nextProps.activeBookToProps.book.book_img2,nextProps.activeBookToProps.book.book_img3,nextProps.activeBookToProps.book.book_img4],
  			downloadedFiles : [nextProps.activeBookToProps.book.book_img1,nextProps.activeBookToProps.book.book_img2,nextProps.activeBookToProps.book.book_img3,nextProps.activeBookToProps.book.book_img4]
  			})
  		}
  	}

  	handleSaveEvent(event)
	{
	if(this.state.files.length!=0)
		if(this.state.uploadedFiles==0)
			{ window.alert('Upload your images first!')
			  return;	
			}


	if(this.props.bookidToProps)
		{
		var downloadedFiles = this.state.downloadedFiles;
		if(downloadedFiles[3]=='images.jpg') downloadedFiles.splice(3,1);
		if(downloadedFiles[2]=='images.jpg') downloadedFiles.splice(2,1);
		if(downloadedFiles[1]=='images.jpg') downloadedFiles.splice(1,1);
		if(downloadedFiles[0]=='images.jpg') downloadedFiles.splice(0,1);
		
		var myarray = downloadedFiles.concat(this.state.uploadedFiles);

		var img1='images.jpg',img2='images.jpg',img3='images.jpg',img4='images.jpg';
		if(typeof myarray[0] !='undefined') {img1 = myarray[0]}
		if(typeof myarray[1] !='undefined') {img2 = myarray[1]}
		if(typeof myarray[2] !='undefined') {img3 = myarray[2]}
		if(typeof myarray[3] !='undefined') {img4 = myarray[3]}

		const editedbook = {
		"book_id" : this.props.bookidToProps,
		"book_name" : this.state.book_name,
		"book_desc" : this.state.book_desc,
		"book_motto" : this.state.book_motto,
		"book_isbn" : this.state.book_isbn,
		"book_publisher" : this.state.book_publisher,
		"book_author" : this.state.book_author,
		"book_price1" : this.state.book_price1,
		"book_price2" : this.state.book_price2,
		"cat_id" : this.state.cat_id ? this.state.cat_id : '1',
		"lng_id" : this.state.lng_id ? this.state.lng_id : '1',
		"book_img1" : img1,
		"book_img2" : img2,
		"book_img3" : img3,
		"book_img4" : img4
		}
	

		this.props.handleSaveEvent(editedbook);
		}	
	}

	_handleSubmit(e) {
		e.preventDefault();
		const files = this.state.files;
		var uploadedFiles = this.state.uploadedFiles;

		for(let i=0; i<files.length; i++)
		{
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			.field('file', files[i]);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				uploadedFiles.push(response.body.secure_url);
				this.setState({uploadedFiles: uploadedFiles});
			}
		});
		}
	window.alert('Finished Uploaded');
	}

	_handleDelete(e,value) {
		var result = confirm("Want to delete?");
		if (result) {
			e.preventDefault();
				if(typeof this.state.imagePreviewUrl[value] !='undefined'){
				const files = this.state.files;
				const imagePreviewUrl = this.state.imagePreviewUrl;
				const downloadedFiles = this.state.downloadedFiles;
				
				files.splice(value,1);
				imagePreviewUrl.splice(value,1);
				imagePreviewUrl[3] ='images.jpg';
				downloadedFiles.splice(value,1);
				downloadedFiles[3] ='images.jpg';
	
				this.setState({files: files,imagePreviewUrl: imagePreviewUrl, downloadedFiles:downloadedFiles});
				this.counter --;
			}	
	}	

	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		const files = this.state.files;
		const imagePreviewUrl = this.state.imagePreviewUrl;

		reader.onloadend = () => {
			var index;
			for(var i=0; i<4; i++)
			{
				if(imagePreviewUrl[i] =='images.jpg') {
					index = i;
					break;
				}
			}

			if(imagePreviewUrl[3]!='images.jpg') {window.alert('Image upload limit exceeded'); return }
			files.push(file);
			imagePreviewUrl[index] = reader.result;
			this.setState({files: files,imagePreviewUrl: imagePreviewUrl});
		}
		reader.readAsDataURL(file);	
	}


	isFloat(n){
    return Number(n) == n && n % 1 != 0;}

    isInt(n){
    return Number(n) == n && n % 1 == 0;}

	handleAddEvent(event)
	{
	if(this.state.files.length!=0)
		if(this.state.uploadedFiles==0)
			{ window.alert('Upload your images first!')
			  return;	
			}

		var img1='images.jpg',img2='images.jpg',img3='images.jpg',img4='images.jpg';
		if(typeof this.state.uploadedFiles[0] !='undefined') {img1 = this.state.uploadedFiles[0]}
		if(typeof this.state.uploadedFiles[1] !='undefined') {img2 = this.state.uploadedFiles[1]}
		if(typeof this.state.uploadedFiles[2] !='undefined') {img3 = this.state.uploadedFiles[2]}
		if(typeof this.state.uploadedFiles[3] !='undefined') {img4 = this.state.uploadedFiles[3]}


		if(!(this.isFloat(this.state.book_price1) || this.isInt(this.state.book_price1))) {window.alert('The price should be decimal'); return;}
		if(!(this.isFloat(this.state.book_price2) || this.isInt(this.state.book_price1))) {window.alert('The sale should be decimal'); return;}

		if(this.state.book_name.length>64){window.alert('The size of a name field is too long, maximum length is 64 characters'); return;}
		if(this.state.book_motto.length>256){window.alert('The size of a motto field is too long, maximum length is 256 characters'); return;}
		if(this.state.book_isbn.length>64){window.alert('The size of a isbn field is too long, maximum length is 64 characters'); return;}
		if(this.state.book_publisher.length>64){window.alert('The size of a publisher field is too long, maximum length is 64 characters'); return;}
		if(this.state.book_author.length>64){window.alert('The size of a author field is too long, maximum length is 64 characters'); return;}


		const newbook = {
		"book_name" : this.state.book_name,
		"book_desc" : this.state.book_desc,
		"book_motto" : this.state.book_motto,
		"book_isbn" : this.state.book_isbn,
		"book_publisher" : this.state.book_publisher,
		"book_author" : this.state.book_author,
		"book_price1" : this.state.book_price1,
		"book_price2" : this.state.book_price2,
		"cat_id" : this.state.cat_id ? this.state.cat_id : '1',
		"lng_id" : this.state.lng_id ? this.state.lng_id : '1',
		"book_img1" : img1,
		"book_img2" : img2,
		"book_img3" : img3,
		"book_img4" : img4
		}
	 this.props.handleAddEvent(newbook);	
	}

	render()
	{	
	var imagerows = [];
		for(let i=0; i<=3; i++){
			imagerows.push(<div className="col-md-3 form-group" key={Math.random()}><img src={this.state.imagePreviewUrl[i]} onClick={(e)=>this._handleDelete(e,i)} width="150"/></div>);
		}


	if(this.props.newBookToProps.loading) {
      return <div><h2>Add a new book</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
    } else if(this.props.newBookToProps.error) {
      return <div className="alert alert-danger">Error: {this.props.newBookToProps.error.message}</div>
    }

    if(this.props.activeBookToProps.loading) {
      return <div><h2>Editing book</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
    } else if(this.props.activeBookToProps.error) {
      return <div className="alert alert-danger">Error: {this.props.activeBookToProps.error.message}</div>
    }

    var subbutton;
    if(this.props.activeBookToProps.book)
    subbutton = (<button type="submit" className="btn btn-success form-control"  onClick={()=>this.handleSaveEvent()}><span className="glyphicon glyphicon-ok"></span> Save Book</button>)
	else
    subbutton = (<button type="submit" className="btn btn-success form-control"  onClick={()=>this.handleAddEvent()}><span className="glyphicon glyphicon-ok"></span> Add Book</button>)
		
		
		return(
			<div className="row">
			<h2>{this.props.activeBookToProps.book ? 'Book Edit :':'Book Add'} </h2>    
			{this.props.activeBookToProps.updated ? <div className="alert alert-success"><strong>Success!</strong> The Book edited, ID - {this.props.activeBookToProps.book.book_id}</div>:''}
			{this.props.newBookToProps.book ? <div className="alert alert-success"><strong>Success!</strong> The Book added, ID - {this.props.newBookToProps.book.book_id}</div>:''}
			
			<div className="form-group col-md-12">
			<label htmlFor="catname">Book name:</label>
			<input type="text" className="form-control" name="book_name" onChange={this.handleInputChange} value={this.state.book_name || ''}/>
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="catdesc">Book motto:</label>
			<input  type="text" className="form-control" name="book_motto" onChange={this.handleInputChange}  value={this.state.book_motto || ''}/>
			</div>
			<div className="form-group col-md-12">
			<label htmlFor="catdesc">Description:</label>
			 <textarea className="form-control" rows="5" name="book_desc" onChange={this.handleInputChange} value={this.state.book_desc || ''}></textarea>
			</div>
			<div className="col-md-4 form-group">	
			<label htmlFor="catname">ISBN:</label>
			<input type="text" className="form-control" name="book_isbn" onChange={this.handleInputChange} value={this.state.book_isbn || ''} />		
			</div>
			<div className="col-md-4 form-group">	
			<label htmlFor="catname">Author:</label>
			<input  type="text" className="form-control" name="book_author" onChange={this.handleInputChange} value={this.state.book_author || ''}/>		
			</div>
			<div className="col-md-4 form-group">	
			<label htmlFor="catname">Publisher:</label>
			<input  type="text" className="form-control" name="book_publisher" onChange={this.handleInputChange} value={this.state.book_publisher || ''}/>		
			</div>

			<div className="col-md-6 form-group">	
			<label htmlFor="catname">Price:</label>
			<input  type="text" className="form-control" name="book_price1" onChange={this.handleInputChange} value={this.state.book_price1 || ''}/>		
			</div>
			<div className="col-md-6 form-group">	
			<label htmlFor="catname">Sale Price:</label>
			<input  type="text" className="form-control" name="book_price2" onChange={this.handleInputChange} value={this.state.book_price2 || ''}/>		
			</div>

			<div className="col-md-6 form-group">	
			<label htmlFor="catname">Category:</label>
			<select className="form-control" name="cat_id" value={this.state.cat_id || '1'} onChange={this.handleInputChange} >
			{this.props.categoriesToProps.categories.map((category)=>(
				<option key={category.cat_id} value={category.cat_id}>{category.cat_name}</option>)
				)
			}
			</select>		
			</div>
			
			<div className="col-md-6 form-group">	
			<label htmlFor="catname">Lanuages:</label>
			<select className="form-control" name="lng_id" value={this.state.lng_id || '1'} onChange={this.handleInputChange} >
			{this.props.lngsToProps.lngs.map((lng)=>(
				<option key={lng.lng_id} value={lng.lng_id}>{lng.lng_name}</option>)
				)
			}
			</select>		
			</div>

			<div className="col-md-12 form-group">	
			<label htmlFor="catname">Images:</label>
			</div>
			
			
			<div className="row">
			<div className="col-md-6"><input className="form-control" type="file" onChange={(e)=>this._handleImageChange(e)} /></div>
			<div className="col-md-6"><button className="form-control btn-primary" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button></div>
			</div>
		
			<br/><br/>
			<div className="row">
			{imagerows}
			</div>

			
			<div className="col-md-6 form-group">	
			<Link to="/book" className="btn btn-danger form-control"><span className="glyphicon glyphicon-share"></span> Go back</Link>
			</div>
			<div className="col-md-6 form-group">	
			{subbutton}
			</div>
			
			</div>
			)
	
}

}


