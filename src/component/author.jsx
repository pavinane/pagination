import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
import ReactPaginate from "react-paginate";

function Author() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 5;

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0&hitsPerPage=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      // console.log(Math.ceil(total/12));
      setItems(Object.values(data.hits));
    };

    getData();
  }, [limit]);

  const fetchData = async (currentPage) => {
    const res = await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}&hitsPerPage=%${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchData(currentPage);

    setItems(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  return (
    <div className="author-data container">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Created At</th>
            <th scope="col">Author</th>
            <th scope="col">Title</th>
            <th scope="col">Url</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className="tabel-datas" key={index}>
              <td>{index}</td>
              <td>{item.created_at}</td>
              <td> {item.title}</td>
              <td>{item.author}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Author;
