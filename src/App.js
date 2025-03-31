import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import MiningTeam from "./pages/MiningTeam";
import Airdrop from "./pages/AirDrop";
import Leaderboard from "./pages/Leaderboard";
import DailyCheckIn from "./pages/DailyCheckIn";
import Withdraw from "./pages/Withdraw";
import TapGame from "./pages/TapGame";
import NodeReward from "./pages/NodeReward";
import SendAsset from "./pages/SendAsset";
import Friendlist from "./pages/Friendlist";
import History from "./pages/History";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MiningIntro from "./pages/Miniintro";
import Api from "./services/Api";
import Profile from './components/Profile';
import { ProtectedRoute, PublicRoute } from './Helper/Helper';
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSettings from "./pages/ProfileSettings";
import Updateprofile from "./pages/Updateprofile";
import ChangePassword from "./pages/ChangePassword";





function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
<ToastContainer position="top-center" autoClose={3000} />
<Router>

      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/miningintro" element={<MiningIntro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/reward" element={<Rewards />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/sendAsset" element={<SendAsset />} />
            <Route path="/friendlist" element={<Friendlist />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/miningTeam" element={<MiningTeam />} />
            <Route path="/tapGame" element={<TapGame />} />
            <Route path="/Airdrop" element={<Airdrop />} />
            <Route path="/nodeReward" element={<NodeReward />} />
            <Route path="/leaderBoard" element={<Leaderboard />} />
            <Route path="/dailyCheckIn" element={<DailyCheckIn />} />
            <Route path="/ProfileSettings" element={<ProfileSettings />} />
            <Route path="/updateprofile" element={<Updateprofile />} />
            <Route path="/changePassword" element={<ChangePassword />} />




          </Route>
        </Routes>
      )}
    </Router>
    </>
  );
}

export default App;