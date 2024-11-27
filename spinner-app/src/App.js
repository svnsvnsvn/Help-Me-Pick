import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Spinner from "./components/Spinner/Spinner";
import InputList from "./components/InputList/InputList";

const App = () => {
  const [segments, setSegments] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/spinner"
          element={<Spinner segments={segments} />}
        />
        <Route
          path="/input"
          element={<InputList segments={segments} setSegments={setSegments} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
