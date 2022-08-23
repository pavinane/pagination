import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FormDatas() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onAuthorChange = (e) => setAuthor(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { author, title };
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //   },
    //   body: JSON.stringify(data),
    // };
    // fetch(
    //   "https://hn.algolia.com/api/v1/search_by_date?tags=story",
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((res) => console.log(res));

    axios
      .post(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`,
        data
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div className="col-md-12 bg-dark author-data">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column mb-3  col-md-4 m-auto align-content-around "
      >
        <input
          placeholder="Author"
          value={author}
          onChange={onAuthorChange}
          required
        />
        <input
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          required
        />
        <button type="submit" onClick={handleSubmit} className="btn btn-danger">
          Create Post
        </button>
      </form>
    </div>
  );
}
