import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaQrcode, FaChevronDown } from "react-icons/fa6";
import {useNavigate } from "react-router-dom";
import { QRCodeCanvas } from 'qrcode.react';
import { FaRegCopy } from 'react-icons/fa';
import Api from '../services/Api';
export default function WalletAddress() {
    const navigate = useNavigate();
    const [walletAddress, setWalletAddress] = useState('');
    const [scanner, setScanner] = useState('');
//   const walletAddress = 'mailto:rameshkashyap8801@gmail.com';
 
useEffect(()=>{
    fetchwallet();
   },[])

   const fetchwallet = async () => {
    try {
      const response = await Api.get("auth/fetchwallet"); // Pass a refid if needed
      console.log(response.data);
      if (response.data?.success) {
        setWalletAddress(response.data.data.address_in); 
        setScanner(response.data.data.callback_url);
      } else {
        console.error("Wallet API did not return data.");
      }
    } catch (error) {
      console.error("Something went wrong fetching the wallet:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Wallet address copied!');
  };

  return (
    <div className="min-h-screen imgbg text-white flex flex-col items-center px-4 pt-6 relative pb-28 w-full max-w-md mx-auto font-sans">
     <div className="flex items-center w-full mb-8">
             <button className="bg-[#1a1a1a] p-3 rounded-full"  onClick={() => navigate("/airdrop")}>
               <FaArrowLeft className="text-white text-lg" />
             </button>
             <h2 className="flex-grow text-center text-xl font-light tracking-widest">
               ON-CHAIN WITHDRAWAL
             </h2>
           </div>
      {/* <button className="absolute top-6 right-6 text-white text-2xl">✕</button> */}

     
      <h2 className="text-center text-3xl font-light tracking-widest mb-6">
        Your Wallet <br /> Address
      </h2>

      <p className="text-sm text-white/80 mb-2">Scan QR code to send</p>
      <div className="p-4 bg-white rounded-xl w-fit mx-auto shadow-lg">
        <QRCodeCanvas value={walletAddress} size={180} bgColor="#ffffff" fgColor="#000000" />
      </div>

      <p className="text-white mt-6 mb-2">Or send to address:</p>

      <div className="bg-[#ffffff0d] border border-[#1efcb9]/20 text-[#ffffff] px-4 py-3 rounded-xl flex items-center justify-between overflow-auto gap-3">
        <span className="text-sm break-all">{walletAddress}</span>
        <button onClick={copyToClipboard} className="text-xl text-[#ffffff]">
          <FaRegCopy />
        </button>
      </div>
      <p className="text-white mt-6 mb-2">Note : Minimum deposit amount is 5 USDT <br/> Currency type will be USDT</p>
    </div>
  );
}