import React, { useState, useEffect } from 'react';
import { FaBolt } from 'react-icons/fa';
import Api from '../services/Api';
import { FaArrowLeft, FaQrcode, FaChevronDown } from "react-icons/fa6";
import { Toaster, toast } from 'react-hot-toast';
import {useNavigate } from "react-router-dom";
const items = [
  {
    id: 1,
    title: '1 ETH',
    logo: '/assets/img/usdt.png',
    originalPrice: '2800USDT',
    price: '1USDT',
    progress: 70,
  },
  {
    id: 2,
    title: '1000USDT',
    logo: '/assets/img/trc20.jpg',
    originalPrice: '1200USDT',
    price: '1USDT',
    progress: 70,
  },
  {
    id: 3,
    title: 'Tesla Model Y',
    logo: '/assets/img/pep20.png',
    originalPrice: '63000USDT',
    price: '1USDT',
    progress: 70,
  },
];

export default function Lautery() {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState([]);
  const [usdt, setUsdt] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); 
  
  useEffect(()=>{
    fatchgudies();
     },[])
    const fatchgudies = async () => {
      try {
          const response = await Api.get('auth/fetch_gudies');
          console.log("API Response:", response.data);
          if (response?.data?.lautry) {
            setName(response.data.lautry);
            setUsdt(response.data.users.usdt);
          } 
      } catch (error) {
          console.error("❌ Fetching rewards failed:", error.message);
      }
  };
   
  const handleBuy = async () => {
    try {
      const payload = {
        gname: selectedItem.gudie_name,
        amount: selectedItem.amount,
        butamount: quantity,
      };
      console.log("Sending payload:", payload);
      
      const response = await Api.post('auth/send_gift', payload);
      console.log("Buy response:", response.data);
      setModalVisible(false);
      if(response.data.success){       
       toast.success("✅ Lautery Buy successfully!", { duration: 1000 });
      }
      
    } catch (error) {
      console.error("❌ Buy failed:", error.message);
    }
  };
  

  return (
    <div className="min-h-screen imgbg text-white px-4 pt-8 pb-24 w-full max-w-md mx-auto font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-between mb-6">
        {/* <button className="text-2xl text-[#1efcb9]">←</button> */}
        <button className="bg-[#9f1eff] p-3 rounded-full"  onClick={() => navigate("/")}>
                  <FaArrowLeft className="text-white text-lg" />
                </button>
        <h1 className="text-center flex-1 text-lg font-semibold tracking-widest">1 USDT</h1>
        <div className="w-6" />
      </div>

      <div className="rounded-xl bg-apin p-4 text-center mb-4 border border-white/10">
        <h2 className="text-lg font-bold">
          <span className="text-white">Get </span>
          <span className="text-yellow-400">1 BTC</span>
          <span className="text-white"> using </span>
          <span className="text-yellow-400">1 USDT</span>
        </h2>
      </div>

      <div className="bg-apin text-[#1efcb9] text-xs rounded-full px-3 py-2 mb-4 text-center">
        🎉 Congratulations to Milad for winning 100USDT!
      </div>

      <h2 className="text-white text-sm mb-3 font-semibold">Item List</h2>
      <div className="space-y-4">
      {name.map((lautry) => (
        <div
          key={lautry.id}
          className="bg-apin rounded-xl p-4 border border-white/10 flex flex-col gap-3"
        >
          <div className="flex items-center gap-4">
            <img
              src={lautry.logo}
              alt={lautry.gudis_name}
              className="w-12 h-12 rounded-full bg-white object-contain"
            />
            <div className="flex-1">
              <div className="font-semibold text-white mb-1">{lautry.gudis_name}</div>
              <div className="h-2 bg-[#333] rounded-full relative">
                <div
                  className="absolute top-0 left-0 h-2 bg-[#9f1eff] rounded-full"
                  style={{ width: `${lautry.bet_amount}%` }}
                />
                <span
                  className="absolute top-[-18px] text-xs text-white"
                  style={{ left: `${lautry.bet_amount}%`, transform: 'translateX(-50%)' }}
                >
                  {lautry.bet_amount}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-yellow-400 text-sm font-bold">
              {lautry.amount}
              <span className="text-white/40 line-through text-xs ml-2">
                {lautry.amount}
              </span>
            </div>
            <button
  onClick={() => {
    setSelectedItem(lautry);
    setModalVisible(true);
  }}
  className="bg-black text-white rounded-full px-4 py-1 flex items-center gap-2 border border-yellow-400"
>
  Buy <FaBolt className="text-yellow-400" />
</button>

          </div>
        </div>
      ))}
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-apin text-white p-6 rounded-xl w-[90%] max-w-sm relative">
            <button onClick={() => setModalVisible(false)} className="absolute top-3 right-4 text-xl">✕</button>
            {/* <h2 className="text-center text-lg font-bold mb-2">Select number of copies to purchase</h2>
            <p className="text-center text-sm text-gray-300 mb-1">
              1 copy requires <span className=" font-semibold">1 USDT</span>, and a single item can be purchased at most
            </p>
            <p className="text-center text-2xl font-bold mb-4">2349 copies</p> */}

            <div className="flex items-center justify-center gap-4 bg-[#0a0f07] rounded-lg border border-white/20 py-2 mb-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="text-2xl px-3"
              >
                -
              </button>
              <div className="text-lg font-semibold">
                {quantity} <span className="text-sm text-gray-300">copies</span>
                <div className="text-xs text-gray-400">Cost {quantity} USDT</div>
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-2xl px-3"
              >
                +
              </button>
            </div>

            {/* <p className="text-yellow-100 bg-yellow-900/40 text-xs text-center rounded-lg px-3 py-2 mb-4">
              You have 0 USDT, the more copies you buy the higher the chance of acquiring!
            </p> */}

            <button
  onClick={handleBuy}
  className="w-full py-2 rounded-full bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black font-bold text-lg"
>
  Buy
</button>

          </div>
        </div>
      )}
    </div>
  );
}
