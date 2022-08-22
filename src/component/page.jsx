import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Page() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0&hitsPerPage=${limit}`
        // `http://localhost:3004/comments?_page=1&_limit=${limit}`
        // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = data.nbPages;
      setpageCount(Math.ceil(total / limit));
      // console.log(Math.ceil(total/12));
      setItems(data.hits);
      console.log(data.hits);
    };

    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}&hitsPerPage=${limit}`
      //   `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
      //   `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();

    return data.hits;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };
  return (
    <div className="container">
      <div className="row m-2">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">NO</th>
              <th scope="col">Created At</th>
              <th scope="col">Author</th>
              <th scope="col">Title</th>
              {/* <th scope="col">Url</th> */}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const day = new Date();
              console.log(day);
              return (
                <tr className="tabel-datas" key={index}>
                  <td>{item.objectID}</td>
                  <td>{item.created_at}</td>
                  <td> {item.title}</td>
                  <td>{item.author}</td>
                  {/* <td>{item.url}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {items.map((item, index) => {
          return (
            <div key={index} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">
                    Id :{item.objectID}{" "}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    Author : {item.author}
                  </h6>
                  <p className="card-text text-center">{item.created_at}</p>
                  <p className="card-text">Title : {item.title}</p>
                </div>
              </div>

            </div>
          );
        })} */}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Page;
