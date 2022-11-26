import React, { Component } from "react";
// import { Link } from "react-router-dom";

export default class Newstem extends Component {
  render() {
    let { title, description, ImageUrl, newUrl,publishedAt,author,source } = this.props;

    return (
      <div>
        <div className="card">
          <img
            src={
              ImageUrl == null
                ? "https://images.nintendolife.com/c098bb8bae970/1280x720.jpg"
                : ImageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
          <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%',
   z_index: '1'
   
    }}>
   {source}
    <span class="visually-hidden">unread messages</span>
  </span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small class="text-muted">By {author} on  {publishedAt}</small>
            </p>

            <a href={newUrl} target="_blank"  rel="noreferrer" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
