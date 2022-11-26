import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
 import PropTypes from 'prop-types'
export default class News extends Component {
   static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number
  };
  static defaultProps = {
    country:'in',
    pageSize:8
  };

  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      pageno: 1,
      totalResults: 0,
    };
  }
  async fechData(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
    &apiKey=63b2d1faa3094eb5ba194de18bc97f8d&page=${this.state.pageno}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        var parsedData = await data.json();
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false,
        });
  }



  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
&apiKey=63b2d1faa3094eb5ba194de18bc97f8d&page=${this.state.pageno}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    var parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
// this.fechData()
  }
  handlepreviousPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
&apiKey=63b2d1faa3094eb5ba194de18bc97f8d&page=${this.state.pageno-1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    var parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      pageno: this.state.pageno - 1,
      loading: false,
    });
    // this.setState({pageno: this.state.pageno - 1})
    // this.fechData();
  };
  handleNextPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
&apiKey=63b2d1faa3094eb5ba194de18bc97f8d&page=${this.state.pageno+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    var parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      pageno: this.state.pageno + 1,
      loading: false,
    });
// this.setState({pageno: this.state.pageno +1})
// this.fechData();
   
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="text center" style={{margin:"25px 0"}}>NewsMonkey- Top Headlines</h2>
          <div className="row">
            {this.state.loading ? (
              <Spinner />
            ) : (
              this.state.articles.map((element) => {
                return (
                  <div className=" col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      ImageUrl={element.urlToImage}
                      newUrl={element.url}
                      publishedAt={ (new Date(element.publishedAt)).toGMTString()}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="container d-flex justify-content-between ">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.pageno === 1 ? true : false}
            onClick={this.handlepreviousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.pageno + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
                ? true
                : false
            }
            className="btn btn-dark"
            onClick={this.handleNextPage}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
// Please give me some time to submit provisional degree certification because I have not got provisional degree cerificate from my college and it will take some time .
