import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaClock, FaWallet, FaDownload, FaCoins } from "react-icons/fa6";
import Footer from "../components/Footer";
import Api from '../services/Api';
import {useNavigate } from "react-router-dom";

export default function Airdrop() {
  const navigate = useNavigate();
  const [gigcoin ,setTapcoin]= useState(0);
  const [moolcoin ,setStreakcoin]= useState(0);
  const [gige, setNodecoin] =useState(0);
  const [trcoin ,setquestcoin]= useState(0); 
  const [lamo ,settaskcoin]= useState(0); 
  const [airo ,setAirocoin] = useState(0);
  const tokens = [
    { name: "AIRO", value: airo, icon: "assets/images/AIROcoin.png" },
    { name: "USDT", value: 0, icon: "assets/images/tether-usdt-logo.svg" },
    { name: "GiggleToken", value: gigcoin + gige, icon: "assets/images/gemcoin.png" },
    { name: "MemeMoola", value: moolcoin, icon: "assets/images/mcoin.png" },
    { name: "ChuckleCoin", value: 5020100, icon: "assets/images/chcoin.png" },
  
    { name: "TrollToken", value: trcoin, icon: "assets/images/trcoin.png" },
    { name: "LMAOCash", value: lamo, icon: "assets/images/lmcoin.png" },
  ];
  useEffect(()=>{
    coins();
  },[])
   
  const coins = async () =>{
    try{
      const response = await Api.get('auth/coins');
      console.log("hello")
       if(response.data){

           setTapcoin(response.data.data.tabbalance?response.data.data.tabbalance:0);
           setNodecoin(response.data.data.meme_coin?response.data.data.meme_coin:0);
           setStreakcoin(response.data.data.streak?response.data.data.streak:0);
           setquestcoin(response.data.data.dailyquest?response.data.data.dailyquest:0);
           settaskcoin(response.data.taskbal?response.data.taskbal:0);
           setAirocoin(response.data.data.airo?response.data.data.airo:0);
       }  
    }
    catch{
      console.error("Somthing is write");
    }
  }
  return (
    <div className="min-h-screen imgbg2 text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      
      <h1 className="text-center text-3xl font-light tracking-widest mb-6">WALLET</h1>

      
      <div className="border border-[#1efcb9]/20 rounded-2xl p-4 text-center mb-10 backdrop-blur bg-white/5 w-full">
        <p className="text-sm text-[#a0dacf] mb-2">AIRO halving countdown</p>
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
        <ActionButton icon={<FaClock />} label="History" onClick={() => navigate("/history")}/>
        <ActionButton icon={<FaCoins />} label="Deposit" />
        <ActionButton icon={<FaDownload />} label="Withdraw"  onClick={() => navigate("/withdraw")}/>
        <ActionButton icon={<FaWallet />} label="Vesting" />
      </div>

      
      <div className="bg-apin rounded-xl px-4 py-6 w-full">
        <h2 className="text-[#ffffff] mb-4 text-base tracking-widest font-light">BALANCE</h2>
        {tokens.map((token, idx) => (
          <div key={idx} className="flex justify-between items-center py-4 border-b border-[#1e3d37] last:border-0">
            <div className="flex items-center space-x-3">
              <img src={token.icon} alt={token.name} className="w-9 h-8 rounded-full" />
              <div>
                <p className="text-white font-semibold text-lg">{token.name}</p>
                {token.subtitle && <p className="text-xs text-gray-400">{token.subtitle}</p>}
              </div>
            </div>
            <p className="text-[#f6f641] font-semibold text-lg">{token.value}</p>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className="bg-gradient-to-b from-[#1efcb9] to-[#108b75] p-5 rounded-full shadow-xl">
        <div className="text-black text-xl">{icon}</div>
      </div>
      <p className="mt-2 text-sm font-semibold text-white drop-shadow-md">{label}</p>
    </div>
  );
}


function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center text-[#ffffff]">
      <p className="text-2xl font-bold">{value}</p>
      <span className="text-xs text-white">{label}</span>
    </div>
  );
}