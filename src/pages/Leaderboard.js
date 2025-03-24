import React from "react";
import { FaArrowLeft, FaUserPlus, FaUsers, FaGift, FaTrophy, FaGamepad, FaWrench, FaHammer } from "react-icons/fa6";
import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";


const leaderboardData = [
    { id: 1, name: "gunalp123", points: "120,689,860", avatar: "assets/klink4.svg" },
    { id: 2, name: "edenjin1", points: "116,876,320", avatar: "assets/klink4.svg" },
    { id: 3, name: "YanJogja", points: "110,275,586", avatar: "assets/klink4.svg" },
    { id: 4, name: "metakine", points: "106,007,763", avatar: "assets/klink4.svg" }
  ];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      {/* Header */}
      
      <h2 className="text-2xl font-bold mb-4">AirDrop Points</h2>
      
   
       {/* Pool Selection */}
       <button className="mt-4 px-6 py-2 bg-[#131a10] text-white-400 border border-green-500 rounded-lg shadow-lg font-semibold">
        Pool I
      </button>

      {/* Total Airdrop Points */}
      <h3 className="text-gray-400 text-sm mt-4">Total Pool I Airdrop Points</h3>
      <div className="flex items-center mt-2">
        <img src="/assets/klink30.svg" alt="Token" className="w-8 h-8 mr-2" />
        <h1 className="text-4xl font-bold">4,187,435</h1>
      </div>

      {/* Community Leaderboard */}
      <div className="w-full mt-6 bg-[#1a1129] p-4 rounded-lg shadow-md border border-gray-700">
        <h3 className="text-lg font-bold mb-4">Community Leaderboard</h3>
        {leaderboardData.map((user, index) => (
          <div key={user.id} className="flex justify-between items-center py-4 border-b border-gray-600 last:border-0">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-300">#{index + 1}</span>
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-green-500" />
              <span className="text-white font-semibold text-sm">{user.name}</span>
            </div>
            <div className="flex items-center">
              <img src="/assets/klink30.svg" alt="Token" className="w-6 h-6 mr-1" />
              <span className="text-white-400 font-semibold text-sm">{user.points}</span>
            </div>
          </div>
        ))}
      </div>

    
 
      {/* Bottom Navigation */}
      <div className="fixed bottom-4 w-full max-w-md bg-[#131a10] rounded-full p-2 flex justify-around items-center border border-gray-700 shadow-md">
        <Gift className="text-gray-400" size={24} />
        <Trophy className="text-gray-400" size={24} />
        <button className="bg-green-400 p-4 rounded-full shadow-xl">
          <Pickaxe className="text-black" size={24} />
        </button>
        <Gamepad className="text-gray-400" size={24} />
        <Settings className="text-gray-400" size={24} />
      </div>
    </div>
  );
};

export default Leaderboard;
