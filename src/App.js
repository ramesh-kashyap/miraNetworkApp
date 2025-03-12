import  React,{ useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { Loader } from "lucide-react";
const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      {loading ? (
        <Loader /> // Show loader while the app is initializing
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
