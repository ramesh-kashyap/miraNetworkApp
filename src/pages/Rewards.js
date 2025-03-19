import React from "react";
import { FaXTwitter, FaTelegram, FaBolt } from "react-icons/fa6";
import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";

const tasks = [
  {
    id: 1,
    icon: <FaXTwitter className="text-white text-2xl" />, 
    title: "Connect Your X (Twitter) Account",
    points: "+150 POINT",
  },
  {
    id: 2,
    icon: <FaTelegram className="text-blue-400 text-2xl" />, 
    title: "Join Telegram Channel",
    points: "+100 POINT",
  },
  {
    id: 3,
    icon: <FaBolt className="text-yellow-400 text-2xl" />, 
    title: "Boost Our Telegram Channel",
    points: "+100 POINT",
  },
];

const invites = [
  { id: 1, title: "Invite 3 friends", points: "+100 POINT", progress: "1/3" },
  { id: 2, title: "Invite 10 friends", points: "+300 POINT", progress: "1/10" },
  { id: 3, title: "Invite 100 friends", points: "+1000 POINT", progress: "1/100" },
];

const Rewards = () => {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Rewards</h2>
      
      {/* Rewards Summary */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center mb-6">
        <h3 className="text-3xl font-bold">201.60 Points</h3>
        <p className="text-gray-400 text-sm">Total Rewards</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Mining</p>
            <p className="text-lg font-bold">201.6 pt</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Tasks</p>
            <p className="text-lg font-bold">0 pt</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Referral</p>
            <p className="text-lg font-bold">0 pt</p>
          </div>
        </div>
      </div>
      
      {/* Available Tasks */}
      <h3 className="text-xl font-bold mb-4">Available Tasks</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700">
                {task.icon}
              </div>
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-green-400 text-sm">{task.points}</p>
              </div>
            </div>
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold">Start</button>
          </div>
        ))}
      </div>

      {/* Invite Friends Section */}
      <h3 className="text-xl font-bold mt-8 mb-4">Invite Friends</h3>
      <div className="space-y-4 w-full">
        {invites.map((invite) => (
          <div key={invite.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow-lg">
            <div>
              <p className="font-semibold">{invite.title}</p>
              <p className="text-green-400 text-sm">{invite.points}</p>
              <button className="mt-2 bg-white text-black px-5 py-2 rounded-full text-sm font-semibold">Invite</button>
            </div>
            <div className="bg-gray-700 p-2 px-4 rounded-full text-sm font-semibold">{invite.progress}</div>
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

export default Rewards;