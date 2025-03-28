import React, { useState,useEffect } from 'react';
import { FaArrowLeft, FaGem } from "react-icons/fa";
import Api from '../services/Api';
import { useNavigate } from "react-router-dom";


const leaderboardData = [
  { name: "kim***", value: "2.796B", img: "/avatars/1.png" },
  { name: "jyb***", value: "2.101B", img: "/avatars/2.png" },
  { name: "sun***", value: "1.726B", img: "/avatars/3.png" },
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const [top3, setTop3] = useState([]);
const [rest7, setRest7] = useState([]);
    const [error, setError] = useState(null); 

    const fetchIncome = async () => {
      try {
        const response = await Api.get('auth/topuser');
        const allUsers = response.data.topUsers || [];
        setTop3(allUsers.slice(0, 3));
        setRest7(allUsers.slice(3));
      } catch (err) {
        console.error("API Error:", err);
        setError(err.response?.data?.error || "Error fetching data");
      }
    };
    
    

    useEffect(() => {
      fetchIncome();
    }, []);
    
    useEffect(() => {
      console.log("Top 3:", top3);
      console.log("Rest 7:", rest7);
    }, [top3, rest7]);
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white px-4 pt-6 pb-24 w-full max-w-md mx-auto font-eurostile relative overflow-hidden">
      <div className="flex items-center mb-4">
      <button
  onClick={() => navigate(-1)}
  className="p-2 w-10 h-10 rounded-xl bg-[#101a19] border border-[#1efcb9]/20 flex items-center justify-center shadow-md"
>
  <FaArrowLeft size={18} className="text-[#1efcb9]" />
</button>
        <h1 className="flex-grow text-center text-xl font-bold tracking-widest ml-[-40px]">LEADERBOARD</h1>
      </div>

      {/* <div className="flex w-full mb-2 rounded-xl overflow-hidden text-sm font-semibold shadow">
        <button className="flex-1 py-2 text-black bg-gradient-to-r from-[#1efcb9] to-[#108b75]">Week</button>
        <button className="flex-1 py-2 bg-[#1a1a1a] text-gray-400">Month</button>
      </div> */}

      {/* <p className="text-center text-xs text-gray-400 mb-6">24/03/2025 - 27/03/2025</p> */}
      {Array.isArray(top3) && top3.length === 3 && (
  <div className="flex justify-around items-end mb-6">
    {/* 2nd */}
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1efcb9] to-[#108b75] p-1 border-2 border-[#1efcb9]">
        <img
          src="/assets/images/default_avt.png"
          alt="2nd"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <p className="text-sm mt-2 text-[#1efcb9] font-semibold">
        {top3[1]?.tusername} <FaGem className="inline-block text-[#1efcb9] text-xs ml-1" />
      </p>
      <p className="text-xs text-white font-medium">{top3[1]?.balance}</p>
      <div className="text-2xl font-bold text-white mt-1">2</div>
    </div>

    {/* 1st */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1 border-4 border-[#ffd700] shadow-lg">
        <img
          src="/assets/images/111.jpeg"
          alt="1st"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <p className="text-lg mt-2 text-[#1efcb9] font-semibold">
        {top3[0]?.tusername} <FaGem className="inline-block text-sm ml-1" />
      </p>
      <p className="text-sm text-white font-semibold"> {top3[0]?.balance}</p>
      <div className="text-3xl font-bold text-white mt-1">1</div>
    </div>

    {/* 3rd */}
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1efcb9] to-[#108b75] p-1 border-2 border-[#1efcb9]">
        <img
          src="/assets/images/default_avt.png"
          alt="3rd"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <p className="text-sm mt-2 text-[#1efcb9] font-semibold">
        {top3[2]?.tusername} <FaGem className="inline-block text-[#1efcb9] text-xs ml-1" />
      </p>
      <p className="text-xs text-white font-medium">{top3[2]?.balance}</p>
      <div className="text-2xl font-bold text-white mt-1">3</div>
    </div>
  </div>
)}
      <div className="bg-[#101a19] rounded-t-2xl p-4 shadow-inner">
      {rest7.length > 0 ? (
    rest7.map((user, index) => (
          <div key={index}  className="flex items-center justify-between py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
            <span className="text-[#1efcb9] font-bold w-4 text-right">{index + 4}</span>
            <img src="/assets/images/default_avt.png" className="w-8 h-8 rounded-full object-cover" alt="avatar" />
              <span className="text-white text-sm">{user.tusername}</span>
            </div>
            <div className="text-[#1efcb9] text-sm font-bold flex items-center gap-1">
            {user.balance} <FaGem className="text-xs" />
            </div>
          </div>
       ))
      ) : (
        <p>No users found</p>
      )}
  
      </div>
    </div>
  );
}