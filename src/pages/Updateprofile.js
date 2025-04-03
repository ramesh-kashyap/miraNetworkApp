import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';

export default function ProfileEdit() {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white px-4 pt-10 pb-8 w-full max-w-md mx-auto font-sans relative">
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-28 h-28">
          <div className="w-full h-full rounded-full bg-[#1efcb9]/20 flex items-center justify-center text-5xl">
            <FaUserEdit className="text-[#1efcb9]" />
          </div>
          <div className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center">
            <FiEdit3 className="text-[#0a0f07]" />
          </div>
        </div>
      </div>

      <label className="text-sm mb-1 block">Full name</label>
      <input
        type="text"
        value="Rames"
        className="w-full py-3 px-4 mb-5 bg-transparent border border-white/10 rounded-xl text-white placeholder:text-white/40"
      />

      <label className="text-sm mb-1 block">Your email</label>
      <p className="text-white mailto:mb-5">rameshkashyap8801@gmail.com</p>

      <label className="text-sm mb-1 block">Phone number</label>
      <div className="flex items-center gap-2 px-4 py-3 border border-white/10 rounded-xl mb-5">
        <span className="text-lg">🇮🇳</span>
        <span className="text-white/80">+91</span>
        <input
          type="tel"
          value="8053461772"
          className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40"
        />
      </div>

      <label className="text-sm mb-1 block">Referral Code</label>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Referral Code"
          className="w-full py-3 pl-4 pr-12 bg-transparent border border-white/10 rounded-xl text-white placeholder:text-white/40"
        />
        <FaQrcode className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#1efcb9]" />
      </div>

      <div className="text-left mb-6">
        <button className="text-red-500 underline text-sm">Delete Account</button>
      </div>

      <button className="w-full bg-gradient-to-r from-[#1efcb9] to-[#0bc7a2] py-4 rounded-xl text-black font-bold text-lg shadow-md">
        Update
      </button>
    </div>
  );
}