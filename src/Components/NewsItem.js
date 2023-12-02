import React, { Component } from 'react'

export class NewsItem extends Component { 
	
  render() { 
	let {title , description, imageUrl , newsUrl , author , date} = this.props ; 
	return (
	  <div className="my-3">
		<div className="card">
		<img src={!imageUrl?"https://cdn.ndtv.com/common/images/ogndtv.png":imageUrl} className="card-img-top" alt="..."/>
		<div className="card-body">
			<h5 className="card-title">{title}</h5>
			<p className="card-text">{description}</p> 
			<p className="card-text"><strong className = "text-muted"> By {!author?"UnKnown" : author} on 
			{new Date(date).toGMTString()} </strong></p>
			<a rel = "noreferrer" href={newsUrl} target = "_blank" className="btn btn-sm btn-primary">Know More</a>
		</div>
		</div>
	  </div>
	)
  }
}

export default NewsItem
