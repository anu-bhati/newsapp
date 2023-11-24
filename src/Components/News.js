import React, { Component } from 'react'
import NewsItem from './NewsItem' 
import Spinner from './Spinner'


export class News extends Component { 
	constructor(){ 
		super(); 
	this.state = { 
		articles: [] , 
		loading: false , 
		page: 1 , 
		totalResults:0
	 }	
  }  

   async componentDidMount(){ 
	let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e72782da96b94dfcadcc79c8181096f6&page=1&pageSize=${this.props.pageSize}` ; 
	this.setState({ 
		loading : true
	})
	let data = await fetch(url) ; 
	let parsedData = await data.json()  
	this.setState({
		articles: parsedData.articles,
	    totalResults: parsedData.totalResults , 
		loading:false
		
	})
   } 

   handlePrevClick = async()=>{ 
	let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e72782da96b94dfcadcc79c8181096f6&page=${this.state.page-1}&pagesize=${this.props.pageSize}` ;  
	this.setState({
		loading : true
	})
	let data = await fetch(url) ; 
	let parsedData = await data.json()  
	this.setState({
		page:this.state.page-1 ,
		articles: parsedData.articles , 
		loading : false
	})
   } 

   handleNextClick = async()=>{  
	
	let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e72782da96b94dfcadcc79c8181096f6&page=${this.state.page+1}&pageSize=${this.props.pageSize}` ; 
	this.setState({ 
		loading : true
	})
	let data = await fetch(url) ; 
	let parsedData = await data.json()  
	this.setState({
		page:this.state.page+1 ,
		articles: parsedData.articles , 
		loading : false
	    }) 
      }
   

  render() {
	return (
	  <div className = "container my-3"> 
	  <h1 className="text-center">NewsMonkey - Top Headlines</h1> 
	  {this.state.loading && <Spinner/>}
	  <div className="row"> 
	  {!this.state.loading && this.state.articles.map((element) => { 
	   return <div className="col-md-4" key = {element.url}>  
	   <NewsItem title = {element.title} description={element.description} 
	   imageUrl = {element.urlToImage} newsUrl = {element.url}/> 
	   </div>
	  })} 	
	</div> 
	<div className="container d-flex justify-content-between">
    <button type = "button" disabled = {this.state.page <= 1} className = "btn btn-dark" onClick = {this.handlePrevClick}> &larr; Prev</button> 
	<button type = "button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className = "btn btn-dark" onClick = {this.handleNextClick}> Next &rarr;</button>
	</div>
</div>
	)
  }
}

export default News
