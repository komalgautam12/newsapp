import "./App.css";
import {
  BrowserRouter as Router,
  
  Route,
 
  
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from "react";
import Navbar from "./Component/Navbar";

import News from "./Component/News";



// import NewsItem from "./Component/NewsItem";


export default class App extends Component {
  NewsApi=process.env.REACT_APP_NEWS_API
 state={ progress:0}
  setProgress=(progress)=>{
this.setState({progress: progress})
  }
  render() {
    return (
      <>
      {console.log(this.NewsApi)}<Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={ this.state.progress}
       
      />

        <Routes>
        <Route exact path="/"  element={<News  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='general'/>}/>
            <Route exact path="/business"   element={<News   key='business'  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='business'/>}/>
            <Route exact path="/entertainment" element={<News key='entertainment'  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='entertainment'/>}/>
            <Route exact path="/general" element={<News key='general'  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='general'/>}/>
            <Route exact path="/health" element={<News key='health'  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='health'/>}/>
            <Route exact path="/science" element={<News key='science'  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='science'/>}/>
            <Route exact path="/sports" element={<News key='sports'  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='sports'/>}/>
            <Route exact path="/technology" element={<News key='technology'  NewsApi={this.NewsApi} pageSize={5}  setProgress={this.setProgress} country='in' category='technology'/>}/>
        </Routes>





        </Router>
      </>
    );
  }
}
