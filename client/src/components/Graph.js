import React, { useState } from "react";
import Chart from "react-google-charts";

function Graph() {
  const [name, setName] = useState("");
  const [chartdata, setChartdata] = useState({
    data: [],
    options: {
      // title: "Age",
      pieHole: 0.4,
      // is3D: true,
      pieSliceTextStyle: {
        color: "black",
      },
    },
  });
  
  const onchange = (e) => {
    setName(e.target.value);
    fetch(`http://127.0.0.1:5000/api/note/${e.target.value}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // setItems(data);
        setChartdata((prevAge) => {
          prevAge.data = data;
          return { ...prevAge };
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="container m-3">
        <h1 className="mt-2 mb-4 text-center">Data Visualization</h1>
        <div className="row my-3">
          <div className="col-md-2">
            <select className="Menu-select" aria-label="Default select example" name="Selection" onChange={onchange}>
              <option value="">Number of Items</option>
              <option value="Food">Food</option>
              <option value="Type">Type</option>
              <option value="Number of Dishes">Number of Dishes</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header">{name === "" ? "Graph" : name}</div>
              <div className="card-body">
                {name === "" ? "Graph" : <Chart chartType="PieChart" data={chartdata.data} options={chartdata.options} width="100%" height="400px" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
