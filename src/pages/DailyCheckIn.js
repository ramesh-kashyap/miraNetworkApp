import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import {  FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const transactions = [
  { id: 1, type: "received", name: "From Albert Flores", date: "10 Feb 2022 at 01:00 pm", amount: "+$12,600.00", color: "text-green-400" },
  { id: 2, type: "sent", name: "To Jenny Wilson", date: "9 Feb 2022 at 06:00 am", amount: "-$824.00", color: "text-red-400" },
  { id: 3, type: "sent", name: "Mailchimp Support", date: "8 Feb 2022 at 02:00 pm", amount: "-$746.00", color: "text-red-400" },
];

const DailyCheckIn = () => {
    const [activeTab, setActiveTab] = useState("boost");
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
      };

      const dailyRewards = [
        { day: 1, amount: "4,000", bonus: false },
        { day: 2, amount: "8,000", bonus: false },
        { day: 3, amount: "12,000", bonus: false },
        { day: 4, amount: "15,000", bonus: false },
        { day: 5, amount: "20,000", bonus: false },
        { day: 6, amount: "25,000", bonus: false },
        { day: 7, amount: "30,000", bonus: true },
        { day: 8, amount: "40,000", bonus: false },
        { day: 9, amount: "50,000", bonus: false },
        { day: 10, amount: "60,000", bonus: false },
        { day: 11, amount: "70,000", bonus: false },
        { day: 12, amount: "90,000", bonus: false },
        { day: 13, amount: "70,000", bonus: false },
        { day: 14, amount: "20,000", bonus: false },
        { day: 15, amount: "70,000", bonus: false },
        { day: 16, amount: "52,000", bonus: false },
        { day: 17, amount: "40,000", bonus: false },
        { day: 18, amount: "50,000", bonus: false },
        { day: 19, amount: "20,000", bonus: false },
        { day: 20, amount: "60,000", bonus: false },
   
      ];
    










      
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Daily Boost</h2>
      {/* Header */}
      <div className="flex w-full max-w-sm bg-\[\#131a10\] rounded-lg p-1">
        <button 
          className={`flex-1 py-3 rounded-lg text-sm font-semibold ${activeTab === "mining" ? "bg-purple-500 text-white" : "bg-\[\#131a10\]"}`} 
          onClick={() => setActiveTab("mining")}
        >
            <Link to="/Airdrop" className="w-full h-full block text-center"> Mining </Link>
          
         
        </button>
        <button 
          className={`flex-1 py-3 rounded-lg text-sm font-semibold ${activeTab === "boost" ? "bg-purple-500 text-white" : "bg-\[\#131a10\]"}`} 
          onClick={() => setActiveTab("boost")}
        >
          Daily Boost
        </button>
      </div>
      
     <br/>

      {/* Header Text */}
      <h3 className="text-lg font-semibold text-center mt-6 px-4">
        Check in daily to claim points and boost your mining rewards!
      </h3>

      {/* Daily Rewards Grid */}
      <div className="grid grid-cols-4 gap-3 mt-6">
        {dailyRewards.map((reward) => (
          <div
            key={reward.day}
            className={`p-3 rounded-lg flex flex-col items-center justify-center border border-green-500 text-center bg-[#1a1129]`}
          >
            <span className="text-gray-400 text-sm">Day {reward.day}</span>
            <img src="/assets/klink30.svg" alt="Token" className="w-6 h-6 mt-2" />
            <span className="text-white-400 font-bold">{reward.amount}</span>
           
          </div>
        ))}
      </div>

   

    </div>
  );
};
export default DailyCheckIn;