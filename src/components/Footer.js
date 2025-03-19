import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="fixed bottom-4 w-full max-w-md bg-[#131a10] rounded-full p-2 flex justify-around items-center border border-gray-700 shadow-md">
      
      {/* Gift Icon - Link to Login Page */}
      <Link to="/reward">
        <Gift className="text-gray-400 cursor-pointer hover:text-gray-600" size={24} />
      </Link>

      {/* Trophy Icon - Link to Rewards Page */}
      <Link to="#">
        <Trophy className="text-gray-400 cursor-pointer hover:text-gray-600" size={24} />
      </Link>

      {/* Pickaxe Button - Link to Home Page */}
      <Link to="/">
        <button className="bg-green-400 p-4 rounded-full shadow-xl">
          <Pickaxe className="text-black" size={24} />
        </button>
      </Link>

      {/* Gamepad Icon - Link to Games Page */}
      <Link to="#">
        <Gamepad className="text-gray-400 cursor-pointer hover:text-gray-600" size={24} />
      </Link>

      {/* Settings Icon - Link to Settings Page */}
      <Link to="#">
        <Settings className="text-gray-400 cursor-pointer hover:text-gray-600" size={24} />
      </Link>

    </div>
  );
};

export default Footer;
