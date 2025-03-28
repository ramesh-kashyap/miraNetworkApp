import React from "react";
import { useNavigate } from "react-router-dom";
export default function MiningIntro() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col justify-between items-center px-6 pt-20 pb-10 w-full max-w-md mx-auto font-sans" style={{paddingBottom:'6.5rem',paddingTop:'13rem'}}>
      <div className="w-full flex justify-center">
      
        <img src="assets/item_dream1-f7368629.png"/>
      
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-extrabold mb-4 tracking-tight leading-snug">Data Mining & Rewards</h2>
        <p className="text-gray-400 text-base leading-relaxed px-4">
          Explore mining operations, complete quests,
          <br className="hidden sm:block" /> and earn rewards.
        </p>
      </div>

  
      <div className="mt-16 w-full flex gap-4">
        <button onClick={() => navigate("/login")} className="flex-1 py-3 rounded-xl text-black font-semibold bg-gradient-to-r from-[#1efcb9] to-[#0bc7a2] shadow-md active:scale-95 transition-transform">
          Sign In
        </button>
        <button onClick={() => navigate("/register")} className="flex-1 py-3 rounded-xl border border-[#1efcb9] text-[#1efcb9] font-semibold bg-transparent hover:bg-[#1efcb9]/10 shadow-md active:scale-95 transition-transform">
          Sign Up
        </button>
      </div>
    </div>
  );
}


