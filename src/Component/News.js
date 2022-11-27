import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };
  static defaultProps = {
    country: "in",
    pageSize: 8,
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
  // async fechData(){
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
  //   &apiKey=63b2d1faa3094eb5ba194de18bc97f8d&page=${this.state.pageno}&pageSize=${this.props.pageSize}`;
  //       this.setState({ loading: true });
  //       let data = await fetch(url);
  //       var parsedData = await data.json();
  //       this.setState({
  //         articles: parsedData.articles,
  //         totalResults: parsedData.totalResults,
  //         loading: false,
  //       });
  // }

  async componentDidMount() {
    this.props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
&apiKey=${this.props.NewsApi}&page=${this.state.pageno}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    var parsedData = await data.json();
    this.props.setProgress(50)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
    // this.fechData()
  }
  //   handlepreviousPage = async () => {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${this.props.category}
  // &apiKey=63b2d1faa3094eb5ba194de18bc97f8d&page=${
  //       this.state.pageno - 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     var parsedData = await data.json();

  //     this.setState({
  //       articles: parsedData.articles,
  //       pageno: this.state.pageno - 1,
  //       loading: false,
  //     });
  //     // this.setState({pageno: this.state.pageno - 1})
  //     // this.fechData();
  //   };
  //   handleNextPage = async () => {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${this.props.category}
  // &apiKey=63b2d1faa3094eb5ba194de18bc97f8d&page=${
  //       this.state.pageno + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     var parsedData = await data.json();

  //     this.setState({
  //       articles: parsedData.articles,
  //       pageno: this.state.pageno + 1,
  //       loading: false,
  //     });
  //     // this.setState({pageno: this.state.pageno +1})
  //     // this.fechData();
  //   };

  fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}
&apiKey=${this.props.NewsApi}&page=${
      this.state.pageno + 1
    }&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    var parsedData = await data.json();
 
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });

    this.setState({ pageno: this.state.pageno + 1 });
  };
  
  render() {
    return (
      <> 
        <h2 className="text-center " style={{ margin: "30px 0", marginTop:'90px' }}>
          NewsMonkey- Top {this.props.category} Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
           
            <div className="row my-4">
              {this.state.articles.map((element) => {
                return (
                  <div className=" col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      ImageUrl={element.urlToImage}
                      newUrl={element.url}
                      publishedAt={new Date(element.publishedAt).toGMTString()}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="row">
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
        </div>  */}
      </>
    );
  }
}

