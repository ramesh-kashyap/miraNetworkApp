import React, { useState,useEffect } from 'react';
import { FaArrowLeft, FaCheck, FaUserFriends, FaCalendarCheck, FaGift, FaStar, FaHammer } from "react-icons/fa";
import { MdToken } from "react-icons/md";
import { RiCalendarEventLine } from "react-icons/ri";
import Api from '../services/Api';



const history = [
//   { icon: <FaStar />, label: "Quest reward", time: "11:43 07/02/2025", amount: "+20,000" },
//   { icon: <FaHammer />, label: "Earned token", time: "11:43 07/02/2025", amount: "+155.52" },
//   { icon: <FaHammer />, label: "Earned token", time: "12:49 04/02/2025", amount: "+155.52" },
  { icon: <FaUserFriends />, label: "Direct referral bonus", time: "12:43 04/02/2025", amount: "+200,000" }
//   { icon: <FaCalendarCheck />, label: "Attendance rewards", time: "15:11 01/02/2025", amount: "+100" },
//   { icon: <FaGift />, label: "Sign-up bonus", time: "13:10 31/01/2025", amount: "+5,000,000" },
];

export default function Friendlist() {
      const [allteam, setTeam] = useState(null); 
      const [error, setError] = useState(null); 



    const fetchTeam = async () => {
        try {
            const response = await Api.get('auth/TotalTeam');
            setTeam(response.data);  // Store API response in state
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching data");
        }
    };


 useEffect(() => {
     fetchTeam ();
   }, []);




   const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(",", "");
}
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white px-4 pt-6 pb-24 w-full max-w-md mx-auto font-sans">
      <div className="flex items-center mb-6">
        <button className="p-2 w-10 h-10 rounded-xl bg-[#101a19] border border-[#1efcb9]/20 flex items-center justify-center shadow-md">
          <FaArrowLeft size={18} className="text-[#1efcb9]" />
        </button>
        <h1 className="flex-grow text-center text-xl font-bold tracking-widest text-white ml-[-40px]">Team</h1>
      </div>

      <div className="space-y-4">
      {allteam && allteam.teamMembers && allteam.teamMembers.length > 0 ? (
    allteam.teamMembers.map((member, index) => (
          <div   key={member.id} className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#101a19] text-[#1efcb9] rounded-md flex items-center justify-center text-lg">
              <img
          src="assets/img/11.svg"
          alt="Athene"
         
        />              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5"> {member.tusername || member.tname || "Unknown"}</p>
                <p className="text-xs text-gray-400 font-mono">{formatDate(member.created_at)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#1efcb9] font-bold text-sm">+{member.balance||  "Unknown"}</p>
              <div className="flex items-center justify-end gap-1">
                {/* <span className="text-[10px] text-gray-400">GEM</span> */}
                <FaCheck className="text-[#1efcb9] text-sm" />
              </div>
            </div>
          </div>
     ))
    ) : allteam ? (
      <p className="text-gray-400">No active miners found.</p>
    ) : (
      <p className="text-gray-400">Loading...</p>
    )}
      </div>
    </div>
  );
}
