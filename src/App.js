import  React,{ useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { Loader } from "lucide-react";
import Rewards from "./pages/Rewards";
import MiningTeam from "./pages/MiningTeam";
import Airdrop from "./pages/AirDrop";
import Leaderboard from "./pages/Leaderboard";

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      {loading ? (
        <Loader /> // Show loader while the app is initializing
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reward" element={<Rewards />} />
          <Route path="/miningTeam" element={<MiningTeam />} />
          <Route path="/Airdrop" element={<Airdrop />} />
          <Route path="/leaderBoard" element={<Leaderboard />} />

        </Routes>
      )}
    </Router>
  );
};

export default App;
