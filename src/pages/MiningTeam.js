import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaCopy, FaUsers, FaPaperPlane, FaWhatsapp, FaFacebook, FaTelegramPlane, FaTimes } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import Footer from "../components/Footer";
import Api from '../services/Api';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from "react-router-dom";
// import { FaExternalLinkAlt } from "react-icons/fa";
export default function MiningTeam() {

  
  const [allteam, setTeam] = useState(null);


  const [allmember, setMember] = useState(0);
  const [inviteBonus, setinviteBonus] = useState(0);
  
  const [error, setError] = useState(null);
  const [refel, setRefal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareText = encodeURIComponent(`Join now and use my referral code ${refel} to earn rewards!`);
  const pageUrl = encodeURIComponent(window.location.origin);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(refel);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000); // Reset after 2s
      toast.success("Copy successful!");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  const fetchTeam = async () => {
    try {
      const response = await Api.get('auth/TotalTeam');
      // console.log(response.data);
      setTeam(response.data);
      setRefal(response.data.refal);
      // Store API response in state
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
    }
  };

  const fetchMember = async () => {
    try {
      const response = await Api.get('auth/TotalMember');
      setMember(response.data.totalMember);  // Store API response in state    
      setRefal(response.data.referralCode);
      setinviteBonus(response.data.inviteBonus);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchMember();
    // fetchTeam();
  }, []);








  return (
    <div className="min-h-screen imgbg text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full bg-gradient-to-br bg-apin border border-[#1efcb9]/20 rounded-2xl p-6 mb-6 shadow-xl">
        <h2 className="text-center text-[#ffffffcc] text-lg font-light tracking-widest mb-4">YOUR FRIENDS</h2>
        <div className="flex flex-col items-center mb-4">
          <div className="text-5xl font-extrabold text-white mb-2">0</div>
          <Link
            to="/friendlist"
            className="text-black text-sm font-semibold bg-gradient-to-r bg-apin px-6 py-2 rounded-full inline-flex items-center gap-2"
          >
            View details <FaExternalLinkAlt size={12} />
          </Link>
        </div>
        
        <div className="flex justify-around text-center text-sm text-white border-t border-[#1efcb9]/20 pt-4">
          <div>
            <div className="text-xl font-bold mb-1">{allmember?? 0}</div>
            <span className="text-xs text-[#bbbbbb]">Direct Referral</span>
          </div>
          <div>
            <div className="text-xl font-bold mb-1">{inviteBonus?? 0}</div>
            <span className="text-xs text-[#bbbbbb]"> Referral Reward</span>
          </div>
        </div>
      </div>

      <div className="w-full flex items-start text-sm text-[#ffffff] mb-6 px-1">
        <FiZap className="mt-1 mr-2 text-lg" />
        <p className="leading-tight">
          Maximize your data network:<br />More nodes, faster mining!
        </p>
      </div>
      

      <div className="w-full bg-gradient-to-br bg-apin border border-[#1efcb9]/20 rounded-2xl p-6 mb-6 shadow-xl text-center">
        <h3 className="text-white font-semibold text-lg mb-4">Expand your network now</h3>
        <div className="flex justify-center mb-4">
        <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${refel}`}
            alt="QR Code"
            className="rounded-xl shadow-md"
          />
        </div>
        <div className="flex items-center justify-center text-[#ffffff] font-semibold text-base">
          {refel}
          <FaCopy className="ml-2 cursor-pointer text-white" onClick={handleCopy} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button className="flex flex-col items-center justify-center bg-gradient-to-br bg-apin border border-[#1efcb9]/20 rounded-xl py-4 shadow-lg hover:scale-105 transition-transform">
          <FaUsers className="text-[#1efcb9] text-2xl mb-2" />
          <span className="text-sm text-white text-center px-1 leading-tight">Join the AIRO Community</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-gradient-to-br bg-apin border border-[#1efcb9]/20 rounded-xl py-4 shadow-lg hover:scale-105 transition-transform" onClick={() => setShowShareOptions(!showShareOptions)}>
          <FaPaperPlane className="text-[#1efcb9] text-2xl mb-2" />
          <span className="text-sm text-white text-center px-1 leading-tight">Invite friends to get huge rewards</span>
        </button>

        {showShareOptions && (
        <div className="absolute w-full bg-gradient-to-br bg-[#1a1a1a] border border-[#1efcb9]/20 rounded-2xl p-6 mb-6 shadow-xl text-center" style={{maxWidth:420}}>
          <button onClick={() => setShowShareOptions(false)} className="absolute top-2 right-3 text-white">
            <FaTimes size={16} />
          </button>
          <span className="text-sm text-[#1efcb9] mb-2">Share your code:</span>
          <div className="flex gap-4 justify-center">
            <a
              href={`https://wa.me/?text=${shareText}%20${pageUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:scale-110 transition-transform"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:scale-110 transition-transform"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href={`https://t.me/share/url?url=${pageUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:scale-110 transition-transform"
            >
              <FaTelegramPlane size={24} />
            </a>
          </div>
        </div>
      )}


      </div>
      
      <Footer />

    </div>



  );
}
