import React from "react";
import { FaGem, FaInfoCircle } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import Footer from "../components/Footer";

export default function NodeReward() {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 pb-24 w-full max-w-md mx-auto font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 animate-pulse text-[#1efcb9] text-[8px] leading-3 tracking-widest select-none">
        <div className="absolute top-0 left-4 rotate-[-20deg] whitespace-pre-line">
          {"011010010\n011010\n1100\n10011\n0100\n101"}
        </div>
        <div className="absolute bottom-0 right-4 rotate-[15deg] whitespace-pre-line">
          {"100101\n10110\n1000\n11011\n101\n001"}
        </div>
      </div>

      <div className="relative z-10 flex w-full mb-6 rounded-xl overflow-hidden shadow-md">
        <button className="flex-1 text-center py-3 bg-[#101a19] text-gray-400 font-medium text-sm">TAP</button>
        <button className="flex-1 text-center py-3 bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black font-bold text-sm tracking-wide">YOUR NODE</button>
      </div>

      <div className="relative z-10 text-center mb-10 pt-4">
        <div className="text-4xl font-extrabold text-[#1efcb9] flex justify-center items-center gap-2">
          2.12 <FaGem className="text-[#1efcb9] text-2xl" />
        </div>
        <p className="text-white tracking-widest text-sm mt-2 flex justify-center items-center gap-1">
          EVERY HOUR <FaInfoCircle className="text-sm text-gray-400" />
        </p>
      </div>

      <div className="relative z-10 w-full bg-[#101a19] border border-[#1efcb9]/20 rounded-2xl px-6 py-6 text-center mb-10 shadow-xl">
        <div className="text-4xl font-extrabold text-[#1efcb9] mb-2 flex justify-center items-center gap-2">
          44.2745 <FaGem className="text-[#1efcb9] text-xl" />
        </div>
        <p className="text-sm text-gray-300 mb-1 tracking-wide">03h 06m 58s</p>
        <p className="text-xs text-gray-400">Time until the next reward</p>
        <button
          disabled
          className="mt-4 w-full bg-[#1a1a1a] text-gray-500 py-2 rounded-xl font-semibold text-sm border border-[#333] cursor-not-allowed"
        >
          Claim
        </button>
      </div>

      <div className="relative z-10 w-full bg-gradient-to-r from-[#2b2b2b] to-[#1a1a1a] py-3 px-4 rounded-xl text-center text-yellow-300 font-bold text-sm mb-6 shadow-sm">
        GET AN EXTRA 300% BOOSTER
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
        <div className="bg-[#101a19] border border-[#1efcb9]/30 rounded-xl px-4 py-5 text-center">
          <div className="text-2xl font-bold text-[#1efcb9] mb-1 flex items-center justify-center gap-1">
            2.12 <FaGem className="text-[#1efcb9] text-lg" />
          </div>
          <p className="text-xs text-white">Basic Harvest Rate</p>
        </div>
        <div className="bg-[#101a19] border border-[#1efcb9]/30 rounded-xl px-4 py-5 text-center">
          <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-1">
            0% <IoRocketOutline className="text-xl text-[#1efcb9]" />
          </div>
          <p className="text-xs text-white">Booster Coefficient</p>
        </div>
      </div>
      <Footer/>

    </div>
  );
}
