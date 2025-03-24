import  React,{ useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

import Home from "./pages/Home";
// import { Loader } from "lucide-react";
import Rewards from "./pages/Rewards";
import MiningTeam from "./pages/MiningTeam";
import Airdrop from "./pages/AirDrop";
import Leaderboard from "./pages/Leaderboard";
import DailyCheckIn from "./pages/DailyCheckIn";

import Api from "./services/Api";
import Profile from './components/Profile';

import ProtectedRoute from "./components/ProtectedRoute";
// import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader"; // ✅ Import Loader for better UX

function App() {
//   const location = useLocation();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id"));
  const [username, setUsername] = useState("Guest"); // ✅ Default username
  const [loading, setLoading] = useState(true);
  const requestSent = useRef(false);

  // ✅ Fetch user login data when the app loads
  useEffect(() => {
    const telegramUser = {
        telegram_id: "1197473382",
        tusername: "rameshkashyapdev",
        tname: "Ramesh",
        tlastname: "",
    };

    const loginUser = async () => {
      
        if (requestSent.current) return; // ✅ Prevent duplicate API calls
           requestSent.current = true;
        
        try {
            const response = await Api.post('auth/telegram-login',telegramUser);
            if (response.data.token) {
                setToken(response.data.token);
                setTelegramId(response.data.telegram_id);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("telegram_id", response.data.telegram_id);

                // ✅ Fetch username after login
                fetchUserInfo(response.data.telegram_id);
            } else {
                console.error("❌ Login Error:", response.data.message);
            }
        } catch (error) {
            console.error("❌ API Error:", error.message, error.stack);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };


    loginUser();
      if (!window.Telegram || !window.Telegram.WebApp) {
          console.error("❌ Telegram WebApp SDK is missing.");
          setLoading(false);
          return;
      }
      const tg = window.Telegram.WebApp;
      tg.expand();
      const initDataUnsafe = tg.initDataUnsafe;

      if (initDataUnsafe && initDataUnsafe.user) {
          setUser(initDataUnsafe.user);
          const telegramUser = {
              telegram_id: initDataUnsafe.user.id,
              tusername: initDataUnsafe.user.username || "",
              tname: initDataUnsafe.user.first_name || "",
              tlastname: initDataUnsafe.user.last_name || "",
          };
          const telegramUser2 = {
              telegram_id: "1197473382",
              tusername: "rameshkashyapdev",
              tname: "Ramesh",
              tlastname: "",
          };

          const loginUser = async () => {
            
              if (requestSent.current) return; // ✅ Prevent duplicate API calls
                 requestSent.current = true;
              
              try {
                  const response = await Api.post('auth/telegram-login',telegramUser);
                  if (response.data.token) {
                      setToken(response.data.token);
                      setTelegramId(response.data.telegram_id);
                      localStorage.setItem("token", response.data.token);
                      localStorage.setItem("telegram_id", response.data.telegram_id);

                      // ✅ Fetch username after login
                      fetchUserInfo(response.data.telegram_id);
                  } else {
                      console.error("❌ Login Error:", response.data.message);
                  }
              } catch (error) {
                  console.error("❌ API Error:", error.message, error.stack);
                  alert(error.message);
              } finally {
                  setLoading(false);
              }
          };


          loginUser();
      }
  }, []);


  
  // ✅ Fetch user info only when telegram_id is available
  useEffect(() => {
      if (telegram_id) {
          fetchUserInfo(telegram_id);
      }
  }, [telegram_id]);

  const fetchUserInfo = async (telegram_id) => {
      try {
          const response = await Api.post('auth/telegram-user-detail', { telegram_id });
          if (response.data.status) {
              setUsername(response.data.user.user_id
                  ? response.data.user.name
                  : `${response.data.user.tname} ${response.data.user.tlastname}`.trim()
              );
          }
      } catch (err) {
          console.error("❌ Error fetching user info:", err);
      } finally {
          setLoading(false);
      }
  };
  if (loading) {
    return <Loader />;
}
  return (
    
    <Router>
      {loading ? (
        <Loader /> // Show loader while the app is initializing
      ) : (

        <Routes>
                            <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
                            <Route path="/reward" element={ <ProtectedRoute><Rewards /></ProtectedRoute> } />
                            <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
                            <Route path="/miningTeam" element={<ProtectedRoute> <MiningTeam /></ProtectedRoute>} />

                            <Route path="/Airdrop" element={<ProtectedRoute> <Airdrop/></ProtectedRoute>} />

                            <Route path="/leaderBoard" element={<ProtectedRoute> <Leaderboard /></ProtectedRoute>} />
                            <Route path="/dailyCheckIn" element={<ProtectedRoute> <DailyCheckIn /></ProtectedRoute>} />




        </Routes>


      )}
    </Router>

  );
};

export default App;
