import { Bell, Star ,Home , Users, Gift, Trophy, Gamepad, Settings, Pickaxe, Wallet } from "lucide-react";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="fixed bottom-4 w-full max-w-md bg-[#131a10] rounded-full p-2 flex justify-around items-center border border-gray-700 shadow-md" style={{zIndex:10}}>
      
      {/* Gift Icon - Link to Rewards Page */}
      <Link to="/">
        <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`}>
          <Home className={`${location.pathname === "/" ? "text-black" : "text-gray-400"}`} size={24} />
        </button>
      </Link>

      {/* Users Icon - Link to Mining Team */}
      <Link to="/airdrop">
      <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/airdrop" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`}>
          <Wallet className={`${location.pathname === "/airdrop" ? "text-black" : "text-gray-400"}`} size={24} />
        </button>
      </Link>

      {/* Pickaxe Button - Link to Home Page (Active Style) */}
      <Link to="/tapgame">
        <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/tapgame"? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`}>
          <Pickaxe className={`${location.pathname === "/tapgame" ? "text-black" : "text-gray-400"}`} size={24} />
        </button>
      </Link>

      {/* Wallet Icon - Link to Airdrop */}
      <Link to="/reward">
      <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/reward" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`}>
          <Star className={`${location.pathname === "/reward" ? "text-black" : "text-gray-400"}`} size={24} />
        </button>
      </Link>

      {/* Settings Icon - Link to Leaderboard */}
      <Link to="/miningTeam">
      <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/miningTeam" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`}>
          <Users className={`${location.pathname === "/miningTeam" ? "text-black" : "text-gray-400"}`} size={24} />
        </button>
      </Link>

    </div>
  );
};

export default Footer;
