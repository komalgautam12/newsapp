import React from "react";


const Newstem =(props)=>{

    // let { title, description, ImageUrl, newUrl, publishedAt, author, source } =
    //   props;

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
              {props.source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <img
            src={
              props.imageUrl == null
                ? "https://images.nintendolife.com/c098bb8bae970/1280x720.jpg"
                : props.imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {props.author} on {props.publishedAt}
              </small>
            </p>

            <a
              href={props.newUrl}
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

export default Newstem;
