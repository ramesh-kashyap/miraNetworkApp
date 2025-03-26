import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";
import Footer from "../components/Footer";
import {useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState,useEffect } from 'react';
import Api from '../services/Api';
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const [coins, setCoins] = useState([]); // Array for floating coins
  const [balance, setBalance] = useState(0); // User balance
  const navigate = useNavigate();
  const [gemCount, setGemCount] = useState(38);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dots, setDots] = useState([]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [alldata, setAlldata] = useState(null);  // State to store user data
  const [tabdata, setTabdata] = useState(null);  // State to store user data
 const [allteam, setTeam] = useState(null); 
 const [allmember, setMember] = useState(null); 
 const [allbalance, setAllBalance] = useState(null); 
 const [error, setError] = useState(null);      
 
 
 useEffect(() => {
  // console.log('hello');
  fetchAlldata();
  fetchTabdata();
  fetchTeam ();
  fetchMember();
  fetchAllBalance();
}, []);
 const fetchMember = async () => {
  try {
      const response = await Api.get('auth/TotalMember');
      setMember(response.data);  // Store API response in state
  } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
  }
};
  
const fetchTabdata = async () => {
  try {
      const response = await Api.get('auth/total-balance');
      setTabdata(response.data);  // Store API response in state
  } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
  }
};

  const fetchAlldata = async () => {
    try {
        const response = await Api.post('auth/telegram-user-detail',{ telegram_id });
        // const response = await Api.post("auth/getTasks", { telegram_id });

        
        console.log('ee',response);
        setAlldata(response.data);  // Store API response in state
    } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
    }
};


const fetchAllBalance = async () => {
  try {
      const response = await Api.get('auth/total-balance');
      setAllBalance(response.data);  // Store API response in state
  } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
  }
};

const fetchTeam = async () => {
  try {
      const response = await Api.get('auth/TotalTeam');
      setTeam(response.data);  // Store API response in state
  } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
  }
};

  const handleTap = () => {
    setGemCount(gemCount + 1);
  };

  const addCoin = (event) => {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 50);
    
    const parent = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    const newCoin = { id: Date.now(), x: clientX - parent.left,y: clientY - parent.top,}; // Unique ID & random position
    setCoins((prev) => [...prev, newCoin]);

    setTimeout(() => {
      setCoins((prev) => prev.filter((coin) => coin.id !== newCoin.id)); // Remove after 1s
    }, 1000);

    // Update balance
    const newBalance = balance + 1;
    // setProBalance(newBalance);
    setBalance(newBalance);
    updateBalance(newBalance);   
    

    setIsClicking(true); // Decrease but not below 0
  };

  const updateBalance = async (newBalance) => {
    // console.log(newBalance);
    try {
      const response = await Api.post("auth/updateBalance", { balance: newBalance });
      // console.log(response.data);
      if(response.data.tabbalance){
        setBalance(response.data.tabbalance);
      }      
    } catch (err) {
      console.error("Error updating balance:", err,{ duration: 1000 });
    }
  };

   const fatchBalance = async () =>{
    try{
      const response = await Api.post("auth/fatchBalance");
      console.log(response.data);
      if(response.data.balance){
        setBalance(response.data.balance);
      }
    }
    catch (err) {
     console.error("Error updating balance:", err,{ duration: 1000 });
    }
   }

   const [activeTab, setActiveTab] = useState("tap");

const tap = () => setActiveTab("tap");
const node = () => setActiveTab("node");

const [isClicking, setIsClicking] = useState(false);

// Calculate progress percentage
 // Run when isClicking changes

// Detect when user stops clicking
useEffect(() => {
  fatchBalance();
  let timeout;
  if (isClicking) {
      timeout = setTimeout(() => setIsClicking(false), 1000); // 1 sec delay after last click
  }
  return () => clearTimeout(timeout); // Cleanup timeout
}, [isClicking]);
useEffect(() => {
  const otpSuccess = sessionStorage.getItem("otpSuccess");
  const message = sessionStorage.getItem("popupMessage");
        if (otpSuccess && message) {
          setIsModalOpen(true);
          sessionStorage.removeItem("otpSuccess");
          sessionStorage.removeItem("popupMessage") // Remove after showing
        }
    }, []);

    const fatchpoints = async () =>{
      try{
         const response = await Api.post('auth/fatchPoint');
        //  console.log("Api response", response);
         if(response.data){
          // settotalBalance(response.data.coin_balance);
          // setcoinBalance(response.data.coin);
          // settotalAllCoins(response.data.totalallCoin);
          if(!response.data.telegram_id){
           toast.error("❌ AiCoinX account is not connected",{ duration: 1000 });
            // setIsModalOpen(true);
          }
          else{
           toast.success("AiCoinX Connected",{ duration: 1000 });
            // setIsModalOpen(true);
          }
         }
      }
      catch(error){
           toast.success("Somthing is wrong", error,{ duration: 1000 });
      }
    }

  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24">
      {/* Header */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center w-full max-w-md px-2 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full">
            <User className="text-white" size={20} />
          </div>
          <p className="text-lg font-semibold">Hello, <span className="font-bold">Sachin</span> 👋</p>
        </div>
        <button className="p-2 bg-gray-800 rounded-full">
          <Bell className="text-green-400" size={20}   onClick={()=>fatchpoints()}/>
        </button>
      </div>

      {/* Mining Bubble */}
      <div className={`relative flex items-center justify-center w-72 h-72 bg-[#1a1f14] rounded-full shadow-2xl border border-gray-700 mb-4 ${isBlinking ? "animate-ping" : ""}`} style={{background: "radial-gradient(circle, rgba(10, 15, 7) 40%, rgba(61, 252, 100, 0.9) 80%)",
    filter: "blur(0px)",
    animation: "rotate 5s linear infinite,  infinite ease-in-out",
    // boxShadow: "0 0 40px 20px #3dfc64",
    }} onClick={addCoin}>
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: -100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute text-yellow-400 text-xl font-bold"
            style={{
              left: `${coin.x}px`, // Exact X position
              top: `${coin.y}px`,  // Exact Y position
              transform: "translate(-50%, -50%)", // Center it properly
              position: "absolute"
            }}
          >
            +1🪙
          </motion.div>
        ))}
      </AnimatePresence>
        <img src="/assets/img/bitcoin-mining.png" alt="image" style={{height:80, width: 80}}/>
      </div>

      {/* Earned Amount */}
      <p className="text-3xl font-bold">{balance} <span className="text-green-400">LUM</span></p>
      <p className="text-gray-400 mb-6">Earned Lumira</p>

      {/* Actions */}
      <div className="flex space-x-4 mb-12">
        <button 

onClick={() => handleButtonClick('reward')}
        className="flex items-center space-x-2 px-4 py-2 border border-green-400 text-green-400 rounded-full bg-[#131a10]">
          <Bell size={16} />
          <span>Ping inactive people</span>
        </button>
        <button 
                          onClick={() => handleButtonClick('status')}

        className="flex items-center space-x-2 px-4 py-2 border border-green-400 text-green-400 rounded-full bg-[#131a10]">
          <Users size={16} />
          <span>Invite new members</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-12">
        <div className="p-4 bg-[#131a10] rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">Active Member</p>
          <p className="text-xl font-bold">{allmember ?.totalMember ?? 0}</p>
        </div>
        <div className="p-4 bg-[#131a10] rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">Total Balance</p>
          <p className="text-xl font-bold">{allbalance?.allBalance ?? 0}</p>
        </div>
        <div className="p-4 bg-[#131a10] rounded-lg text-center border border-gray-700">
          <p className="text-gray-400"> Mining Rewards</p>
          <p className="text-xl font-bold"> {allmember ?.getInviteBonus.invite_bonus ?? 0}</p>
        </div>
        <div className="p-4 bg-[#131a10] rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">Current mining rate</p>
          <p className="text-xl font-bold">{allbalance?.bonus ?? 0}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
