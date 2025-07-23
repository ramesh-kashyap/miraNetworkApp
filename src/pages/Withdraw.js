import React ,{useState, useEffect}from "react";
import { FaArrowLeft, FaQrcode, FaChevronDown } from "react-icons/fa6";
import Footer from "../components/Footer";
import {useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import Api from '../services/Api';
export default function Withdraw() {
  const initialState = {
    currency: "AIRO",
    amount: "",
    wallet: "",
    network: "BNB SmartChain", // since it's always the same
  };
  
  const [formData, setFormData] = useState(initialState);
  const { currency, amount, wallet, network } = formData;
  const navigate = useNavigate();
   const [balance, setBalance] =useState();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
       withfatch();
       },[])
  const withfatch = async () => {
    try {
      const response = await Api.get("auth/withfatch");
      console.log(response.data.data.usdt);
      if (response.data) {
                setBalance(response.data.data.usdt);
      } 
    } catch (error) {
      console.error(error);
      toast.error("Error submitting withdraw request.");
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault(); // ✅ You had this commented, needs to be active
    try {
      const response = await Api.post("auth/withdraw", formData);
      console.log(response.data);
      if (response.data) {
         toast.success(response.data?.message || "Withdraw successfully!", { duration: 1000 });
        setFormData(initialState);
      } 
    } catch (error) {
      console.error(error);
      toast.error("Error submitting withdraw request.");
    }
  };
  return (
    <div className="min-h-screen imgbg text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Header */}
      <div className="flex items-center w-full mb-8">
        <button className="bg-[#1a1a1a] p-3 rounded-full"  onClick={() => navigate("/airdrop")}>
          <FaArrowLeft className="text-white text-lg" />
        </button>
        <h2 className="flex-grow text-center text-xl font-light tracking-widest">
          ON-CHAIN WITHDRAWAL
        </h2>
      </div>


      {/* Choose Asset */}
      {/* <div className="w-full mb-6">
        <label className="text-gray-400 text-sm mb-1 block">Choose an asset</label>
        <div className="flex items-center justify-between bg-apin px-4 py-4 rounded-xl border border-[#1efcb9]/20 w-full">
          <div className="flex items-center space-x-2">
            <img src="assets/images/AIROcoin.png" alt="AIRO" className="w-6 h-6 rounded-full" />
            <span className="text-white font-medium">AIRO</span>
          </div>
          <FaChevronDown className="text-[#1efcb9]" />
        </div>
      </div> */}
      <div className="w-full mb-6">
       <label className="text-gray-400 text-sm mb-1 block">Choose an asset</label>
       <select
            name="currency"
            className="flex items-center justify-between bg-apin px-4 py-4 rounded-xl border border-[#1efcb9]/20 w-full"
            value={currency}
            onChange={handleChange}
          >
            <div className="flex items-center space-x-2">
            <img src="assets/images/AIROcoin.png" alt="AIRO" className="w-6 h-6 rounded-full ml-0" />            
          </div>           
            <option value="USDT" className="text-white font-medium" style={{backgroundColor:"#4e4e4e66"}}>USDT</option>           
          </select>          
      {/* <FaChevronDown className="text-[#1efcb9]" /> */}
       </div>


      {/* Amount */}
      <div className="w-full mb-6">
        <div className="flex justify-between text-sm mb-1">
          <label className="text-gray-400">Amount you want to withdraw</label>
          <span className="text-[#1efcb9]">Balance: {balance}</span>
        </div>
        <div className="flex items-center justify-between bg-apin px-4 py-4 rounded-xl border border-[#1efcb9]/20 w-full">
          <input
            type="number"
            name="amount"
            placeholder="Amount" value={amount} onChange={handleChange}
            className="bg-transparent outline-none text-white placeholder-gray-500 text-sm flex-1"
          />
          <button className="text-[#1efcb9] font-semibold text-sm">MAX</button>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="w-full mb-6">
        <label className="text-gray-400 text-sm mb-1 block">Wallet address</label>
        <div className="flex items-center justify-between bg-apin px-4 py-4 rounded-xl border border-[#1efcb9]/20 w-full">
          <input
            type="text"
            name="wallet"
            placeholder="Wallet address" value={wallet} onChange={handleChange}
            className="bg-transparent outline-none text-white placeholder-gray-500 text-sm flex-1"
          />
          <FaQrcode className="text-[#1efcb9] ml-3" />
        </div>
      </div>

      <div className="w-full mb-6">
        <label className="text-gray-400 text-sm mb-1 block">Network</label>
        <div className="flex items-center justify-between bg-apin px-4 py-4 rounded-xl border border-[#1efcb9]/20 w-full">
        <input
            type="text" placeholder="BNB SmartChai" value="BNB SmartChain" readOnly
            className="bg-transparent outline-none text-white placeholder-gray-500 text-sm flex-1"
          />
          {/* <span className="text-white font-semibold text-sm">BNB SmartChain</span> */}
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
        <span>0.0 USDT</span>
      </div>

      {/* Confirm Button */}
      <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black text-lg font-semibold py-3 rounded-full shadow-md">
        Confirm
      </button>
      {/* <Footer/> */}

    </div>
  );
}
