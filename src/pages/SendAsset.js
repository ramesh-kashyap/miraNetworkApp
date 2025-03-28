import React from "react";
import { FaArrowLeft, FaGamepad, FaRocket, FaExchangeAlt } from "react-icons/fa";
import { FiGlobe, FiTrendingUp, FiUsers } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function SendAsset() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f07] to-[#020402] text-white px-4 pt-6 pb-24 w-full max-w-md mx-auto font-sans relative overflow-hidden">
      <div className="flex items-center mb-6">
        <button className="p-2 w-10 h-10 rounded-xl bg-[#101a19] border border-[#1efcb9]/20 flex items-center justify-center shadow-md">
        <img
  src="/assets/images/122.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>         </button>
        <h1 className="flex-grow text-center text-2xl font-bold tracking-wide text-white ml-[-40px]">Send Asset</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/122.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>          <p className="text-sm font-semibold text-white">Internal</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/126.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">Gaming</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/129.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">Prediction</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/128.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">P2P</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/127.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">Launchpad</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/123.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">ATX Exchange</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/124.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">ATX Funding</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/124.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">Hexobank Funding</p>
        </div>

        <div className="flex items-center gap-4 bg-[#101a19]/70 border border-[#1efcb9]/30 rounded-xl py-4 px-5">
        <img
  src="/assets/images/124.svg"
  alt="Internal"
  className="w-6 h-6 object-contain"
/>           <p className="text-sm font-semibold text-white">Game Funding</p>
        </div>
      </div>
    </div>
  );
}
