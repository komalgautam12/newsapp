import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageno, setpageno] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 
  const updateData = async () => {
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.NewsApi}&page=${pageno}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    var parsedData = await data.json();

    props.setProgress(50);

    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);

  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateData();
     // eslint-disable-next-line
  }, []);

  // const handlepreviousPage = () => {
  //   setpageno(pageno - 1);
  //   updateData();
  // };
  // const handleNextPage = async () => {
  //   setpageno(pageno + 1);
  //   updateData();
  // };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}
&apiKey=${props.NewsApi}&page=${pageno + 1}&pageSize=${props.pageSize}`;
setpageno(pageno + 1);
    let data = await fetch(url);
    var parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    

   
  };

  return (
    <>
      <h2
        className="text-center "
        style={{ margin: "30px 0", marginTop: "90px" }}
      >
        NewsMonkey- Top {props.category} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-4">
            {articles.map((element) => {
              return (
                <div className=" col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
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
            disabled={pageno === 1 ? true : false}
            onClick={handlepreviousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={
              pageno + 1 >
              Math.ceil(totalResults / props.pageSize)
                ? true
                : false
            }
            className="btn btn-dark"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        </div>  */}
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
};
export default News;
