import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import {  FaTimesCircle } from "react-icons/fa";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import Api from '../services/Api';

const transactions = [
  { id: 1, type: "received", name: "From Albert Flores", date: "10 Feb 2022 at 01:00 pm", amount: "+$12,600.00", color: "text-green-400" },
  { id: 2, type: "sent", name: "To Jenny Wilson", date: "9 Feb 2022 at 06:00 am", amount: "-$824.00", color: "text-red-400" },
  { id: 3, type: "sent", name: "Mailchimp Support", date: "8 Feb 2022 at 02:00 pm", amount: "-$746.00", color: "text-red-400" },
];

const Airdrop = () => {
    const [activeTab, setActiveTab] = useState("mining");
    const [faqOpen, setFaqOpen] = useState(null);
  const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id") || "");

     const [alldata, setAlldata] = useState(null);  // State to store user data
      const [error, setError] = useState(null); 

      const fetchAlldata = async () => {
        try {
            const response = await Api.get('auth/total-balance');
            setAlldata(response.data);  // Store API response in state
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching data");
        }
    };
  
    useEffect(() => {
      console.log('hello');
      fetchAlldata();
    }, []);








    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
      };

      const faqData = [
        {
          question: "What is AiroCoin Finance?",
          answer: "AiroCoin is a multi-service quest and earnings platform designed to help you grow your crypto wealth."
        },
        {
          question: "How can I connect my TON Wallet?",
          answer: "To connect your TON Wallet, navigate to settings and follow the wallet connection steps."
        },
        {
          question: "Does AiroCoin support the TON Network?",
          answer: "Yes, AiroCoin fully supports the TON Network, allowing users to interact seamlessly with TON-based assets."
        },
        {
          question: "What are $AiroCoin Points?",
          answer: "$AiroCoin Points are rewards earned through mining, referrals, and completing tasks within the AiroCoin ecosystem."
        },
        {
          question: "What is $AiroCoin Mining?",
          answer: "$AiroCoin Mining allows users to passively earn points by participating in activities, staking, and referrals."
        },
        {
          question: "How Can I Start Mining Points?",
          answer: "To start mining points, complete the required onboarding tasks, ensure your account is connected, and activate mining mode."
        },
        {
          question: "What Are Daily Multipliers?",
          answer: "Daily Multipliers increase your mining rate based on your activity, referrals, and staking levels."
        },
        {
          question: "Will Airdrop Rewards Have Vesting?",
          answer: "Yes, some rewards may have a vesting period to ensure fair distribution and prevent market dumping."
        },
        {
          question: "Is AiroCoin Available in All Countries?",
          answer: "AiroCoin is available in most countries, but some regions may have restrictions based on local regulations."
        }
      ];
      




  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Assets</h2>
      {/* Header */}
      <div className="flex w-full max-w-sm bg-\[\#131a10\] rounded-lg p-1">
        <button 
          className={`flex-1 py-3 rounded-lg text-sm font-semibold ${activeTab === "mining" ? "bg-purple-500 text-white" : "bg-\[\#131a10\]"}`} 
          onClick={() => setActiveTab("mining")}
        >
          Mining
        </button>
        <button 
          className={`flex-1 py-3 rounded-lg text-sm font-semibold ${activeTab === "boost" ? "bg-purple-500 text-white" : "bg-\[\#131a10\]"}`} 
          onClick={() => setActiveTab("boost")}
        >
  <Link to="/dailyCheckIn" className="w-full h-full block text-center">Daily Boost </Link>
  </button>
      </div>
      
     <br/>

      {/* Balance Card */}

       {/* Total Airdrop Points */}
       <h3 className="text-gray-400 text-sm mt-6">Total $AiroCoin Airdrop Points</h3>
      <h1 className="text-5xl font-bold" style={{marginTop:'10px'}}>  <img src="/assets/klink30.svg" style={{float:'inline-start'}} alt="Invite" className="w-12 h-12 mr-2" />{alldata?.totalBalance ?? 0}</h1>



   

      {/* Actions */}
      <br/>
       {/* Invite a Friend Section */}
       <div className="w-full bg-[#131a10] p-4 mt-6 rounded-lg flex items-center text-sm shadow-md border border-gray-700">
        <img src="/assets/click20.svg" alt="Invite" className="w-12 h-12 mr-3" />
        <div>
          <h3 className="text-lg font-bold">Invite a friend</h3>
          <p className="text-gray-300 flex items-center"><span className="text-yellow-400 text-xl mr-2">🏆</span> +2,500 for you and your friend</p>
        </div>
      </div>
      <br/>
    

      {/* Transactions */}
      <h3 className="w-full text-lg font-bold mb-4">Faq</h3>
      <div className="w-full mt-2">
        {faqData.map((item, index) => (
          <div key={index} className="bg-[#1a1129] p-4 rounded-lg mt-2 shadow-md border border-gray-700">
            <button className="w-full flex justify-between items-center" onClick={() => toggleFaq(index)}>
              <span className="text-white font-semibold">{item.question}</span>
              <span>{faqOpen === index ? <FaTimesCircle className="text-gray-400" /> : "+"}</span>
            </button>
            {faqOpen === index && (
              <p className="text-gray-400 mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
      <Footer/>

    </div>
  );
};
export default Airdrop;