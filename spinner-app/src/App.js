import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";

const App = () => {

  return (
    
    <Router>
      <Routes>
        {/* Route for the spinner page */}
        <Route path="/" element={<Spinner />} />

        {/* Route for the spinner page */}
        {/* <Route path="/spinner" element={<Spinner  />}/> */}
      </Routes>
    </Router>
  );
};

export default App;