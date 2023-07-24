import React, { useEffect, useState } from "react";
import Graph from "./Graph";

function Output() {
    const [items, setItems] = useState(null);
    const [query,setQuery] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/note/fetchall", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0]["Age"])
        setItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container">
        <div className="container mx-3 my-3">
          <Graph />
          <div className="container mx-3 my-3">
          <input type="text" placeholder="Search.." name="search" className="search" onChange={(e)=>setQuery(e.target.value)}/>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Names</th>
              <th>Number of Items</th>
              <th>Type</th>
              <th>number of Dishes</th>
            </tr>
          </thead>
          <tbody>
          {items &&
            items
            .filter((item)=> item["Item"].toLowerCase().includes(query) || item["Number of Items"].includes(query) || item["Type"].toLowerCase().includes(query) || item["number of Dishes"].toLowerCase().includes(query))
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item["Menu"]}</td>
                  <td>{item["Number of Items"]}</td>
                  <td>{item["Type "]}</td>
                  <td>{item["Number of Dishes"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Output;
