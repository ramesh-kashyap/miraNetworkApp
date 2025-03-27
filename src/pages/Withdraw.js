import React from "react";
import { FaArrowLeft, FaQrcode, FaChevronDown } from "react-icons/fa6";
import Footer from "../components/Footer";

export default function Withdraw() {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center w-full mb-8">
        <button className="bg-[#1a1a1a] p-3 rounded-full">
          <FaArrowLeft className="text-white text-lg" />
        </button>
        <h2 className="flex-grow text-center text-xl font-light tracking-widest">
          ON-CHAIN WITHDRAWAL
        </h2>
      </div>


      {/* Choose Asset */}
      <div className="w-full mb-6">
        <label className="text-gray-400 text-sm mb-1 block">Choose an asset</label>
        <div className="flex items-center justify-between bg-[#101a19] px-4 py-4 rounded-xl border border-[#1efcb9]/30 w-full">
          <div className="flex items-center space-x-2">
            <img src="/assets/img/ATN.svg" alt="ATN" className="w-6 h-6 rounded-full" />
            <span className="text-white font-medium">ATN</span>
          </div>
          <FaChevronDown className="text-[#1efcb9]" />
        </div>
      </div>

      {/* Amount */}
      <div className="w-full mb-6">
        <div className="flex justify-between text-sm mb-1">
          <label className="text-gray-400">Amount you want to withdraw</label>
          <span className="text-[#1efcb9]">Balance: 25</span>
        </div>
        <div className="flex items-center justify-between bg-[#101a19] px-4 py-4 rounded-xl border border-[#1efcb9]/30 w-full">
          <input
            type="text"
            placeholder="Amount"
            className="bg-transparent outline-none text-white placeholder-gray-500 text-sm flex-1"
          />
          <button className="text-[#1efcb9] font-semibold text-sm">MAX</button>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="w-full mb-6">
        <label className="text-gray-400 text-sm mb-1 block">Wallet address</label>
        <div className="flex items-center justify-between bg-[#101a19] px-4 py-4 rounded-xl border border-[#1efcb9]/30 w-full">
          <input
            type="text"
            placeholder="Wallet address"
            className="bg-transparent outline-none text-white placeholder-gray-500 text-sm flex-1"
          />
          <FaQrcode className="text-[#1efcb9] ml-3" />
        </div>
      </div>

      {/* Network */}
      <div className="w-full mb-6">
        <label className="text-gray-400 text-sm mb-1 block">Network</label>
        <div className="flex items-center justify-between bg-[#101a19] px-4 py-4 rounded-xl border border-[#1efcb9]/30 w-full">
          <span className="text-white font-semibold text-sm">Athene Parthenon</span>
          <FaChevronDown className="text-[#1efcb9]" />
        </div>
      </div>

      {/* Warning */}
      <p className="text-red-500 text-sm text-left w-full mb-6 leading-relaxed">
        Note: Please double-check your wallet address to ensure you receive your assets. Blockchain transactions cannot be reversed once sent.
      </p>

      {/* Fee */}
      <div className="w-full flex justify-between text-sm text-[#1efcb9] mb-6">
        <span>Fee:</span>
        <span>0.0 ATN</span>
      </div>

      {/* Confirm Button */}
      <button className="w-full bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black text-lg font-semibold py-3 rounded-full shadow-md">
        Confirm
      </button>
      <Footer/>

    </div>
  );
}
