import React from "react";
import { FaArrowLeft, FaGamepad, FaRocket, FaExchangeAlt } from "react-icons/fa";
import { FiGlobe, FiTrendingUp, FiUsers } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function SendAsset() {
  const options = [
    { icon: <FiGlobe />, label: "Internal" },
    { icon: <FaGamepad />, label: "Gaming" },
    { icon: <FiTrendingUp />, label: "Prediction" },
    { icon: <FiUsers />, label: "P2P" },
    { icon: <FaRocket />, label: "Launchpad" },
    { icon: <FaExchangeAlt />, label: "ATX Exchange" },
    { icon: <MdOutlineAttachMoney />, label: "ATX Funding" },
    { icon: <MdOutlineAttachMoney />, label: "Hexobank Funding" },
    { icon: <MdOutlineAttachMoney />, label: "Game Funding" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f07] to-[#020402] text-white px-4 pt-6 pb-24 w-full max-w-md mx-auto font-sans relative overflow-hidden">
      <div className="flex items-center mb-6">
        <button className="p-2 w-10 h-10 rounded-xl bg-[#101a19] border border-[#1efcb9]/20 flex items-center justify-center shadow-md">
          <FaArrowLeft size={18} className="text-[#1efcb9]" />
        </button>
        <h1 className="flex-grow text-center text-2xl font-bold tracking-wide text-white ml-[-40px]">Send Asset</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, idx) => (
          <div
            key={idx}
            className="flex items-center justify-start gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5 shadow-lg hover:scale-[1.03] transition-transform"
          >
            <div className="text-2xl text-[#1efcb9]">{opt.icon}</div>
            <p className="text-sm font-semibold text-white tracking-wide whitespace-nowrap">{opt.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}