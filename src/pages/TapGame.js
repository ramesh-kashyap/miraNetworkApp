import React from "react";
import { FaGem, FaInfoCircle } from "react-icons/fa";
import Footer from "../components/Footer";


export default function TapGame() {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 pb-24 w-full max-w-md mx-auto font-sans">

      <div className="flex w-full mb-6 rounded-xl overflow-hidden shadow-lg">
        <button className="flex-1 text-center py-3 bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black font-bold text-sm tracking-wide">TAP</button>
        <button className="flex-1 text-center py-3 bg-[#101a19] text-gray-400 font-medium text-sm">YOUR NODE</button>
      </div>

      <div className="w-full bg-[#101a19] border border-[#1efcb9]/40 rounded-2xl px-4 py-6 text-center mb-6 shadow-md">
        <p className="text-sm text-white mb-3 tracking-wide">Total GEM earned from TAP</p>
        <div className="flex justify-center items-center gap-3 text-xl">
          <div className="w-5 h-5 rounded-full bg-[#1efcb9] flex items-center justify-center text-[#0a0f07] text-xs font-bold shadow-md">0</div>
          <FaGem className="text-[#1efcb9] text-xl" />
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-extrabold text-black text-lg shadow-md">⚡</div>
        <div className="text-4xl font-extrabold text-yellow-300 ml-4 tracking-wider drop-shadow">218</div>
        <FaInfoCircle className="ml-2 text-gray-400 text-base" />
      </div>

      <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#1efcb9]/60 shadow-xl mb-8 relative">
        <img
          src="assets/img/12.png"
          alt="Athene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 border-4 border-[#1efcb9]/20 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        <div className="bg-[#101a19] border border-[#1efcb9]/30 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 tracking-wide">Level</p>
          <p className="text-3xl font-extrabold text-[#1efcb9] mt-2">15</p>
        </div>
        <div className="bg-[#101a19] border border-[#1efcb9]/30 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 mb-2 tracking-wide">Conversion Rate</p>
          <p className="text-base text-white font-medium">
            1 <span className="text-yellow-300 font-bold">EC</span> ≈ <span className="text-[#1efcb9] font-bold">1.060</span> <FaGem className="inline-block ml-1 text-[#1efcb9]" />
          </p>
        </div>
      </div>

      <button
        disabled
        className="w-full bg-[#1a1a1a] text-gray-500 py-3 rounded-xl font-semibold text-sm border border-[#333] cursor-not-allowed opacity-60 tracking-wide"
      >
        Convert EC and get GEM
      </button>
      <Footer/>

    </div>
    
  );
}


