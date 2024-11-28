import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Spinner from "./components/Spinner/Spinner";
// import InputList from "./components/InputList/InputList";

const App = () => {

  return (
    
    <Router>
      <Routes>
        {/* Route for the welcome screen */}
        <Route path="/" element={<Welcome />} />

        {/* Route for the spinner page */}
        <Route path="/spinner" element={<Spinner  />}/>
      </Routes>
    </Router>
  );
};

export default App;