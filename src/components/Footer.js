import { Bell, Star ,Home , Users, Gift, Trophy, Gamepad, Settings, Pickaxe, Wallet } from "lucide-react";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="fixed bottom-2 w-full max-w-md bg-gradient-to-r from-[#1efcb9] to-[#108b75] rounded-full flex justify-around items-center border border-gray-700 shadow-md" style={{zIndex:10}}>
      
      {/* Gift Icon - Link to Rewards Page */}
      <Link to="/">
        <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`} style={{padding:8, margin:6}}>
          <Home className={`${location.pathname === "/" ? "text-black" : "text-white-400"}`} size={24} />
        </button>
      </Link>

      {/* Users Icon - Link to Mining Team */}
      <Link to="/airdrop">
      <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/airdrop" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`} style={{padding:8, margin:6}}>
          <Wallet className={`${location.pathname === "/airdrop" ? "text-black" : "text-white-400"}`} size={24} />
        </button>
      </Link>

      {/* Pickaxe Button - Link to Home Page (Active Style) */}
      <Link to="/tapgame">
        <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/tapgame"? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`} style={{padding:8, margin:6}}>
          <Pickaxe className={`${location.pathname === "/tapgame" ? "text-black" : "text-white-400"}`} size={24} />
        </button>
      </Link>

      {/* Wallet Icon - Link to Airdrop */}
      <Link to="/reward">
      <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/reward" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`} style={{padding:8, margin:6}}>
          <Gift className={`${location.pathname === "/reward" ? "text-black" : "text-white-400"}`} size={24} />
        </button>
      </Link>

      {/* Settings Icon - Link to Leaderboard */}
      <Link to="/miningTeam">
      <button className={`cursor-pointer hover:text-gray-600 ${location.pathname === "/miningTeam" ? "p-4 rounded-foot shadow-xl bg-green-400" : ""}`} style={{padding:8, margin:6}}>
          <Users className={`${location.pathname === "/miningTeam" ? "text-black" : "text-white-400"}`} size={24} />
        </button>
      </Link>

    </div>
  );
};

export default Footer;
