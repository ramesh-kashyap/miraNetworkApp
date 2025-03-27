import React, { useState,useEffect } from 'react';
import { FaExternalLinkAlt, FaCopy, FaUsers, FaPaperPlane } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import Footer from "../components/Footer";
import Api from '../services/Api';
import { Link } from "react-router-dom";
// import { FaExternalLinkAlt } from "react-icons/fa";
export default function MiningTeam() {


  const [allteam, setTeam] = useState(null); 


  const [allmember, setMember] = useState(null); 
  const [error, setError] = useState(null); 
   const fetchTeam = async () => {
     try {
         const response = await Api.get('auth/TotalTeam');
         setTeam(response.data);  // Store API response in state
     } catch (err) {
         setError(err.response?.data?.error || "Error fetching data");
     }
 };
 
 const fetchMember = async () => {
   try {
       const response = await Api.get('auth/TotalMember');
       setMember(response.data);  // Store API response in state
   } catch (err) {
       setError(err.response?.data?.error || "Error fetching data");
   }
 };
 
   useEffect(() => {
     fetchMember();
     fetchTeam ();
   }, []);








  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      <div className="w-full bg-gradient-to-br from-[#0f1c17] to-[#10241b] border border-[#1efcb9]/30 rounded-2xl p-6 mb-6 shadow-xl">
        <h2 className="text-center text-[#ffffffcc] text-lg font-light tracking-widest mb-4">YOUR FRIENDS</h2>
        <div className="flex flex-col items-center mb-4">
          <div className="text-5xl font-extrabold text-white mb-2">0</div>
          <Link
  to="/friendlist"
  className="text-black text-sm font-semibold bg-gradient-to-r from-[#1efcb9] to-[#108b75] px-6 py-2 rounded-full inline-flex items-center gap-2"
>
  View details <FaExternalLinkAlt size={12} />
</Link>
        </div>
        <div className="flex justify-around text-center text-sm text-white border-t border-[#1efcb9]/20 pt-4">
          <div>
            <div className="text-xl font-bold mb-1">{allmember ?.totalMember ?? 0}</div>
            <span className="text-xs text-[#bbbbbb]">Direct Referral</span>
          </div>
          <div>
            <div className="text-xl font-bold mb-1">{allmember ?.getInviteBonus.invite_bonus ?? 0}</div>
            <span className="text-xs text-[#bbbbbb]"> Referral Reward</span>
          </div>
        </div>
      </div>

      <div className="w-full flex items-start text-sm text-[#1efcb9] mb-6 px-1">
        <FiZap className="mt-1 mr-2 text-lg" />
        <p className="leading-tight">
          Maximize your data network:<br />More nodes, faster mining!
        </p>
      </div>

      <div className="w-full bg-gradient-to-br from-[#0f1c17] to-[#10241b] border border-[#1efcb9]/30 rounded-2xl p-6 mb-6 shadow-xl text-center">
        <h3 className="text-white font-semibold text-lg mb-4">Expand your network now</h3>
        <div className="flex justify-center mb-4">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=76386191bb80"
            alt="QR Code"
            className="rounded-xl shadow-md"
          />
        </div>
        <div className="flex items-center justify-center text-[#1efcb9] font-semibold text-base">
          76386191bb80
          <FaCopy className="ml-2 cursor-pointer text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button className="flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1c17] to-[#10241b] border border-[#1efcb9]/30 rounded-xl py-4 shadow-lg hover:scale-105 transition-transform">
          <FaUsers className="text-[#1efcb9] text-2xl mb-2" />
          <span className="text-sm text-white text-center px-1 leading-tight">Join the Athene Community</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1c17] to-[#10241b] border border-[#1efcb9]/30 rounded-xl py-4 shadow-lg hover:scale-105 transition-transform">
          <FaPaperPlane className="text-[#1efcb9] text-2xl mb-2" />
          <span className="text-sm text-white text-center px-1 leading-tight">Invite friends to get huge rewards</span>
        </button>
      </div>
      <Footer/>

    </div>



  );
}
