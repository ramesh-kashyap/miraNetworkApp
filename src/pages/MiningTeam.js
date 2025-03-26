import React, { useState,useEffect } from 'react';
import { FaArrowLeft, FaUserPlus, FaUsers, FaGift, FaTrophy, FaGamepad, FaWrench, FaHammer } from "react-icons/fa6";
import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";
import Footer from "../components/Footer";
import Api from '../services/Api';


const activeMiners = ["jerbla"];
const inactiveMiners = [];
const claimableRewards = 0;

const MiningTeam = () => {

 const [allteam, setTeam] = useState(null); 


 const [allmember, setMember] = useState(null); 
 const [error, setError] = useState(null); 
  const fetchTeam = async () => {
    try {
        const response = await Api.get('auth/TotalTeam');
        setTeam(response.data);  // Store API response in state
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

  useEffect(() => {
    fetchMember();
    fetchTeam ();
  }, []);


  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      {/* Header */}
      
      <h2 className="text-2xl font-bold mb-4">Mining team</h2>
      
      {/* Friends & Claimable Rewards Section */}
      <div className="w-full bg-[#1a1a1a] p-6 rounded-xl shadow-lg text-center mb-6">
        <FaUsers className="text-green-400 text-4xl mx-auto mb-2" />
        <h3 className="text-xl font-bold">Your Friends {allmember ?.totalMember ?? 0}</h3>
        <div className="bg-[#222] p-4 rounded-lg mt-4">
          <p className="text-gray-400 text-sm">Claimable Rewards</p>
          <p className="text-2xl font-bold">{allmember ?.
getInviteBonus.invite_bonus ?? 0} pt</p>
        
        </div>
        <p className="text-gray-400 text-sm mt-4">
          Invite your friend to XyZCoin! Earn <span className="text-green-400">20%</span> of their rewards and <span className="text-green-400">5%</span> from their friends' rewards.
        </p>
      </div>
      
      {/* Active Miners Section */}
      <div className="mb-6 w-full">
  <h3 className="text-lg font-semibold mb-2 text-white">Active Miners</h3>

  {allteam && allteam.teamMembers && allteam.teamMembers.length > 0 ? (
    allteam.teamMembers.map((member, index) => (
      <div
        key={member.id}
        className="bg-[#1a1a1a] p-4 rounded-xl flex items-center space-x-2 shadow-md w-full mb-2"
      >
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        <span className="text-white text-lg">
        {member.tusername || member.tname || "Unknown"}

        </span>
      </div>
    ))
  ) : allteam ? (
    <p className="text-gray-400">No active miners found.</p>
  ) : (
    <p className="text-gray-400">Loading...</p>
  )}
</div>
      {/* Inactive Miners Section */}
      <div className="mb-10 w-full">
      </div>
      
      {/* Invite New Miners Button */}
      <div className="w-full max-w-md mb-4">
        <button className="w-full bg-green-500 text-black text-lg font-semibold py-4 rounded-full flex items-center justify-center space-x-2 shadow-lg">
          <FaUserPlus className="text-black" />
          <span>Invite New Miners</span>
        </button>
      </div>
      
      {/* Bottom Navigation */}
      <Footer/>

    </div>
  );
};

export default MiningTeam;
