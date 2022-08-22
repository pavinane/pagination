import React, { useState, useEffect } from "react";
import Author from "./component/author";
import Page from "./component/page";

function App() {
  // 3. Create out useEffect function

  return (
    <div className="App">
      <div className="m-5">
        {/* <Author /> */}
        <Page />
      </div>
    </div>
  );
}

export default App;
