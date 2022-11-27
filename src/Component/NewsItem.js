import React, { Component } from "react";
// import { Link } from "react-router-dom";

export default class Newstem extends Component {
  render() {
    let { title, description, ImageUrl, newUrl, publishedAt, author, source } =
      this.props;

    return (
      <div>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge rounded-pill bg-danger">
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
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
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {publishedAt}
              </small>
            </p>

            <a
              href={newUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
