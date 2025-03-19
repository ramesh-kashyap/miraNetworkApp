import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";
import Footer from "../components/Footer";
import React, { useState,useEffect } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import Api from '../services/Api';


export default function Home() {

  const [telegram_id] = useState(localStorage.getItem("telegram_id"));
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

    useEffect(() => {
      fetchMiningBonus();
    }, []);
    const fetchMiningBonus = async () => {
      try {
        const response = await Api.get("auth/get-mining-bonus");
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




  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md px-2 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full">
            <User className="text-white" size={20} />
          </div>
          <p className="text-lg font-semibold">Hello, <span className="font-bold">Ramesh kashyap</span> 👋</p>
        </div>
        <button className="p-2 bg-gray-800 rounded-full">
          <Bell className="text-green-400" size={20} />
        </button>
      </div>

      {/* Mining Bubble */}
      <div className="relative flex items-center justify-center w-72 h-72 bg-[#1a1f14] rounded-full shadow-2xl border border-gray-700 mb-4">
        <p className="text-gray-400 text-lg font-semibold">Start Mining</p>
      </div>

      {/* Earned Amount */}
      <p className="text-3xl font-bold">1.00012 <span className="text-green-400">LUM</span></p>
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
          <p className="text-gray-400">Active members</p>
          <p className="text-xl font-bold">0</p>
        </div>
        <div className="p-4 bg-[#131a10] rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">Bonus from mining</p>
          <p className="text-xl font-bold">0.0 LUM/h</p>
        </div>
        <div className="p-4 bg-[#131a10] rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">Mining time left</p>
          <p className="text-xl font-bold">23:58:24</p>
        </div>
        <div className="p-4 bg-[#131a10] rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">Current mining rate</p>
          <p className="text-xl font-bold">0.005 LUM/h</p>
        </div>
      </div>

    

      <Footer/>
    </div>
  );
}
