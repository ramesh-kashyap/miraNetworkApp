import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe, Wallet } from "lucide-react";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="fixed bottom-4 w-full max-w-md bg-[#131a10] rounded-full p-2 flex justify-around items-center border border-gray-700 shadow-md">
      
      {/* Gift Icon - Link to Rewards Page */}
      <Link to="/reward">
        <Gift 
          className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/reward" ? "text-green-400" : "text-gray-400"}`} 
          size={24} 
        />
      </Link>

      {/* Users Icon - Link to Mining Team */}
      <Link to="/miningTeam">
        <Users 
          className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/miningTeam" ? "text-green-400" : "text-gray-400"}`} 
          size={24} 
        />
      </Link>

      {/* Pickaxe Button - Link to Home Page (Active Style) */}
      <Link to="/">
        <button className={`p-4 rounded-full shadow-xl ${location.pathname === "/" ? "bg-green-400" : "bg-gray-700"}`}>
          <Pickaxe className={`${location.pathname === "/" ? "text-black" : "text-gray-400"}`} size={24} />
        </button>
      </Link>

      {/* Wallet Icon - Link to Airdrop */}
      <Link to="/airdrop">
        <Wallet 
          className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/airdrop" ? "text-green-400" : "text-gray-400"}`} 
          size={24} 
        />
      </Link>

      {/* Settings Icon - Link to Leaderboard */}
      <Link to="/leaderBoard">
        <Settings 
          className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/leaderBoard" ? "text-green-400" : "text-gray-400"}`} 
          size={24} 
        />
      </Link>

    </div>
  );
};

export default Footer;
