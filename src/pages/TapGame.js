import React, { useState, useEffect } from "react";
import { FaGem, FaInfoCircle } from "react-icons/fa";
import Footer from "../components/Footer";
import {useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Api from "../services/Api";
export default function TapGame() {
  const [coins, setCoins] = useState([]); // Array for floating coins
  const [balance, setBalance] = useState(0); // User balance
  const navigate = useNavigate();
  const [gemCount, setGemCount] = useState(38);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dots, setDots] = useState([]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [premium,  setPremium] = useState();
  const addCoin = (event) => {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 50);
    
    const parent = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    const newCoin = { id: Date.now(), x: clientX - parent.left,y: clientY - parent.top,}; // Unique ID & random position
    setCoins((prev) => [...prev, newCoin]);

    setTimeout(() => {
      setCoins((prev) => prev.filter((coin) => coin.id !== newCoin.id)); // Remove after 1s
    }, 1000);

    // Update balance
    const newBalance = balance + 1;
    // setProBalance(newBalance);
    setBalance(newBalance);
    updateBalance(newBalance); 
  };
  useEffect(() => {
    fatchBalance(); // Call with false when useEffect triggers
  }, []);

  const updateBalance = async (newBalance) => {
    // console.log(newBalance);
    try {
      const response = await Api.post("auth/updateBalance", { balance: newBalance });
      // console.log(response.data);
      if(response.data.tabbalance){
        fatchBalance();
      }      
    } catch (err) {
      console.error("Error updating balance:", err,{ duration: 1000 });
    }
  };

  const fatchBalance = async () =>{
    try{
      const response = await Api.get("auth/fatchCoin");
      console.log(response.data);
      if(response.data.tabbalance){
        setBalance(response.data.tabbalance);
        setPremium(response.data.premium);
      }
    }
    catch (err) {
     console.error("Error updating balance:", err,{ duration: 1000 });
    }
   }

   const getCoinValue = (premium) => {
    switch (premium) {
      case 'Bronze':
        return 2;
      case 'Silver':
        return 3;
      case 'Golden':
        return 4;
      case 'Diamond':
        return 5;  
      default:
        return 1;
    }
  };
  const coinValue = getCoinValue(premium);

  return (
    <div className="min-h-screen imgbg text-white flex flex-col items-center px-4 pt-8 pb-24 w-full max-w-md mx-auto font-sans">

      <div className="flex w-full mb-6 rounded-xl overflow-hidden shadow-lg">
        <button className="flex-1 text-center py-3 bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black font-bold text-sm tracking-wide">TAP</button>
        <button className="flex-1 text-center py-3 bg-apin text-gray-400 font-medium text-sm" onClick={() => navigate("/nodereward")}>YOUR NODE</button>
      </div>

      <div className="w-full bg-apin border border-[#1efcb9]/20 rounded-2xl px-4 py-6 text-center mb-6 shadow-md">
        <p className="text-sm text-white mb-3 tracking-wide">Total GIG earned from TAP</p>
        <div className="flex justify-center items-center gap-3 text-xl">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold shadow-md">{balance}</div>
          <img src="assets/images/gemcoin.png" alt="gemcoin" style={{width:40, height: 30}}/>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-extrabold text-black text-lg shadow-md">⚡</div>
        <div className="text-4xl font-extrabold text-yellow-300 ml-4 tracking-wider drop-shadow">{balance}</div>
        <FaInfoCircle className="ml-2 text-gray-400 text-base" />
      </div>
       
      <div className="w-64 h-64 rounded-full overflow-hidden border-4 Bgtap border-[#1efcb9]/60 shadow-xl mb-8 relative" onClick={addCoin}>
      
        <img src="assets/img/t12.png" alt="Athene" className={`w-full h-full object-cover imgtp ${isBlinking ? "animate-ping": ""}`} onClick={addCoin}/>
        <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: -100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute text-yellow-400 text-xl font-bold"
            style={{
              left: `${coin.x}px`, // Exact X position
              top: `${coin.y}px`,  // Exact Y position
              transform: "translate(-50%, -50%)", // Center it properly
              position: "absolute"
            }}
          >
            +{coinValue}🪙
          </motion.div>
        ))}
      </AnimatePresence>
        <div className="absolute inset-0 border-4 border-[#1efcb9]/20 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        <div className="bg-apin border border-[#1efcb9]/20 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 tracking-wide">Level</p>
          <p className="text-3xl font-extrabold text-[#1efcb9] mt-2">15</p>
        </div>
        <div className="bg-apin border border-[#1efcb9]/20 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 mb-2 tracking-wide">Conversion Rate</p>
          <p className="text-base text-white font-medium">
            1 <span className="text-yellow-300 font-bold">EC</span> ≈ <span className="text-[#1efcb9] font-bold">1.060</span> 
            {/* <FaGem className="inline-block ml-1 text-[#1efcb9]" /> */}
            <img className="inline-block ml-1 text-[#1efcb9]" src="assets/images/gemcoin.png" alt="gemcoin" style={{width:30, height: 20}}/>
          </p>
        </div>
      </div>

      {/* <button
        disabled
        className="w-full bg-[#1a1a1a] text-gray-500 py-3 rounded-xl font-semibold text-sm border border-[#333] cursor-not-allowed opacity-60 tracking-wide"
      >
        Convert EC and get GIG
      </button> */}
      <Footer/>

    </div>
    
  );
}


