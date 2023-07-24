import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Output from "./components/Output";
import Index from "./components/Index";

function App() {
  return (
    <div className="container">
      <Router>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/Graph" element={<Output />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
