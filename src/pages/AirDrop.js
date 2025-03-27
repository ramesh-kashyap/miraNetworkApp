import React from "react";
import { FaArrowUp, FaArrowDown, FaClock, FaWallet, FaDownload, FaCoins } from "react-icons/fa6";
import Footer from "../components/Footer";

const tokens = [
  { name: "ATN", value: 25, icon: "/tokens/atn.png" },
  { name: "DOGE", value: 0, icon: "/tokens/doge.png" },
  { name: "GEM", value: 5020100, icon: "/tokens/gem.png" },
  { name: "AUSD", value: 0, icon: "/tokens/ausd.png", subtitle: "$0" },
  { name: "P2P", value: 0, icon: "/tokens/p2p.png" },
];

export default function Airdrop() {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      
      <h1 className="text-center text-3xl font-light tracking-widest mb-6">WALLET</h1>

      
      <div className="border border-[#1efcb9]/40 rounded-2xl p-4 text-center mb-10 backdrop-blur bg-white/5 w-full">
        <p className="text-sm text-[#a0dacf] mb-2">ATN halving countdown</p>
        <div className="flex justify-center space-x-4 text-xl">
          <CountdownBox value="066" label="Days" />
          <CountdownBox value="07" label="Hours" />
          <CountdownBox value="41" label="Minutes" />
          <CountdownBox value="17" label="Seconds" />
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-6 mb-12 w-full">
        <ActionButton icon={<FaArrowUp />} label="Send" />
        <ActionButton icon={<FaArrowDown />} label="Receive" />
        <ActionButton icon={<FaClock />} label="History" />
        <ActionButton icon={<FaCoins />} label="Deposit" />
        <ActionButton icon={<FaDownload />} label="Withdraw" />
        <ActionButton icon={<FaWallet />} label="Vesting" />
      </div>

      
      <div className="bg-[#101e1d] rounded-xl px-4 py-6 w-full">
        <h2 className="text-[#42eac2] mb-4 text-base tracking-widest font-light">BALANCE</h2>
        {tokens.map((token, idx) => (
          <div key={idx} className="flex justify-between items-center py-4 border-b border-[#1e3d37] last:border-0">
            <div className="flex items-center space-x-3">
              <img src={token.icon} alt={token.name} className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-white font-semibold text-lg">{token.name}</p>
                {token.subtitle && <p className="text-xs text-gray-400">{token.subtitle}</p>}
              </div>
            </div>
            <p className="text-[#f6f641] font-semibold text-lg">{token.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-b from-[#1efcb9] to-[#108b75] p-5 rounded-full shadow-xl">
        <div className="text-black text-xl">{icon}</div>
      </div>
      <p className="mt-2 text-sm font-semibold text-white drop-shadow-md">{label}</p>
    </div>
  );
}

function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center text-[#42eac2]">
      <p className="text-2xl font-bold">{value}</p>
      <span className="text-xs text-white">{label}</span>
    </div>
  );
}