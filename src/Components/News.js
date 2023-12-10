import React, { Component } from 'react'
import NewsItem from './NewsItem' 
import Spinner from './Spinner' 
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {  

	capital = (string)=>{ 
       return string.charAt(0).toUpperCase() + string.slice(1) ; 
	}

	constructor(props){ 
		super(props); 
	this.state = { 
		articles: [] , 
		loading: true , 
		page: 1 , 
		totalResults:0
	  } 
	  document.title = `${this.capital(this.props.category)} - NewsMonkey` 
	 	
  }  

   async componentDidMount(){ 
	this.props.setProgress(10);
	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
	&apiKey=e72782da96b94dfcadcc79c8181096f6&page=${this.state.page}&pageSize=${this.props.pageSize}` ; 
	this.setState({ 
		loading : true
	})
	let data = await fetch(url) ; 
	this.props.setProgress(40); 
	let parsedData = await data.json() 
	this.props.setProgress(70);  
	this.setState({
		articles: parsedData.articles,
	    totalResults: parsedData.totalResults , 
		loading:false
		
	}) 
	this.props.setProgress(100);
   }  

   fetchMoreData = async() =>{  
	this.setState({ 
		page : ++this.state.page + 1  
	})
	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
	&apiKey=e72782da96b94dfcadcc79c8181096f6&page=${this.state.page}&pageSize=${this.props.pageSize}` ; 
	
	let data = await fetch(url) ; 
	let parsedData = await data.json()  
	this.setState({
		articles: this.state.articles.concat(parsedData.articles) ,
	    totalResults : parsedData.totalResults  	
	})
   } 
   

   /*handlePrevClick = async()=>{ 
	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
	&apiKey=e72782da96b94dfcadcc79c8181096f6&page=${this.state.page-1}&pagesize=${this.props.pageSize}` ;  
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
   } */

   /*handleNextClick = async()=>{  
	
	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
	&apiKey=e72782da96b94dfcadcc79c8181096f6&page=${this.state.page+1}&pageSize=${this.props.pageSize}` ; 
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
      }*/
   

  render() {
	return (
	  <> 
	  <h1 className="text-center" style = {{margin : '35px 0px'}}>NewsMonkey - Top 
	  {this.capital(this.props.category)} Headlines</h1> 
	  {this.state.loading && <Spinner/>} 
	  <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}>
                 
      <div className="container">
	  <div className="row"> 
	  {this.state.articles.map((element) => { 
	   return <div className="col-md-4" key = {element.url}>  
	   <NewsItem title = {element.title} description={element.description} 
	   imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt}/> 
	   </div>
	  })} 	
	</div> 
	</div> 
	</InfiniteScroll> 
	{/*<div className="container d-flex justify-content-between">
    <button type = "button" disabled = {this.state.page <= 1} className = "btn btn-dark" onClick = {this.handlePrevClick}> &larr; Prev</button> 
	<button type = "button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className = "btn btn-dark" onClick = {this.handleNextClick}> Next &rarr;</button>
	</div>*/}
</>
	)
  } 
}


export default News
