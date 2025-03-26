import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";
import Footer from "../components/Footer";
import {useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState,useEffect } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';



export default function Home() {
  const navigate = useNavigate();

  const [alldata, setAlldata] = useState(null);  // State to store user data
  const [tabdata, setTabdata] = useState(null);  // State to store user data
 const [allteam, setTeam] = useState(null); 
 const [allmember, setMember] = useState(null); 
 const [allbalance, setBalance] = useState(null); 


  const [error, setError] = useState(null);      
  const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id") || "");
  const [activeButton, setActiveButton] = useState('reward');
  const [value1, setValue1] = useState('0.00');  
  const [value2, setValue2] = useState('0.00');  
  const [text1, setText1] = useState('Todays Mining');  
  const [text2, setText2] = useState('Total Rewards');  
  


  const handleButtonClick = (button) => {
    setActiveButton(button);

    if (button === 'reward') {
      fetchMiningBonus(); 
     
    } else {
      setValue1('100');   
      setValue2('0.25 TH/s');   
      setText1('Network Difficulty');   
      setText2('Hash Rate');   
    }
  };

  
    const fetchMiningBonus = async () => {
      try {
        const response = await Api.get("auth/get-mining-bonus");

        console.log('respone',response);
        if (response.data.success) {
          setText1('Todays Mining');   
          setText2('Total Rewards');  
          setValue1(response.data.todayBonus?response.data.todayBonus:0.0);
          setValue2(response.data.totalBonus);
        }
      } catch (error) {
        console.error("❌ Error fetching lastTrade:", error);
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


  const fetchMember = async () => {
    try {
        const response = await Api.get('auth/TotalMember');
        setMember(response.data);  // Store API response in state
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

  
  const fetchBalance = async () => {
    try {
        const response = await Api.get('auth/total-balance');
        setBalance(response.data);  // Store API response in state
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





  useEffect(() => {
    // console.log('hello');
    fetchAlldata();
    fetchTabdata();
    fetchTeam ();
    fetchMember();
    fetchBalance();

        fetchMiningBonus();
  }, []);
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
      <div className={`relative flex items-center justify-center w-72 h-72 bg-[#1a1f14] rounded-full shadow-2xl border border-gray-700 mb-4 ${isBlinking ? "animate-ping" : ""}`} onClick={addCoin}>
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
        <p className="text-gray-400 text-lg font-semibold">Start Mining</p>
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
      onClick={() => navigate('/miningTeam')}
      className="flex items-center space-x-2 px-4 py-2 border border-green-400 text-green-400 rounded-full bg-[#131a10]"
    >
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
