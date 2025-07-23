import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';

export default function Fatchtopuser() {
  const navigate = useNavigate();
  const [topuser, setTopuser] = useState([]);
  const [giftWiseTopUsers, setGiftWiseTopUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  // Define gift value in USDT
  const giftValueMap = {
    "Gold Box": 100,
    "Silver Box": 50,
    "Bronze Box": 20
    // Add more gifts if needed
  };

  const processUserData = (topuserData, userList) => {
    const overallUserMap = {};
    const giftUserMap = {};

    topuserData.forEach((entry) => {
      const { userId, gift_name } = entry;
      const usdtValue = giftValueMap[gift_name] || 0;

      // Overall USDT per user
      if (!overallUserMap[userId]) {
        overallUserMap[userId] = { userId, usdt: 0 };
      }
      overallUserMap[userId].usdt += usdtValue;

      // USDT per user per gift
      if (!giftUserMap[gift_name]) {
        giftUserMap[gift_name] = {};
      }
      if (!giftUserMap[gift_name][userId]) {
        giftUserMap[gift_name][userId] = { userId, usdt: 0 };
      }
      giftUserMap[gift_name][userId].usdt += usdtValue;
    });

    const overallUsers = Object.values(overallUserMap).map(user => {
      const matchedUser = userList.find(u => u.id === user.userId);
      return {
        ...user,
        name: matchedUser ? matchedUser.name : "Unknown"
      };
    });

    const giftUsers = Object.entries(giftUserMap).map(([giftName, users]) => {
      const userArray = Object.values(users).map(user => {
        const matchedUser = userList.find(u => u.id === user.userId);
        return {
          ...user,
          name: matchedUser ? matchedUser.name : "Unknown"
        };
      });

      return {
        giftName,
        users: userArray.sort((a, b) => b.usdt - a.usdt)
      };
    });

    return {
      overallUsers: overallUsers.sort((a, b) => b.usdt - a.usdt),
      giftUsers
    };
  };

  const fetchTopUser = async () => {
    try {
      const response = await Api.get('auth/fatchtop');
      const rawTopUsers = response.data?.topuser || [];
      const userArray = response.data?.usert || [];

      const { overallUsers, giftUsers } = processUserData(rawTopUsers, userArray);
        
      console.log(rawTopUsers);
      setTopuser(overallUsers);
      setGiftWiseTopUsers(giftUsers);
      setUserList(userArray);
    } catch (err) {
      console.error(err.response || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchTopUser();
  }, []);

  return (
    <div className="min-h-screen imgbg text-white px-4 pt-6 pb-24 w-full max-w-md mx-auto font-sans">
      <div className="flex items-center mb-6">
        <button
          className="p-2 w-10 h-10 rounded-xl bg-apin border border-[#1efcb9]/20 flex items-center justify-center shadow-md"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={18} className="text-[#1efcb9]" />
        </button>
        <h1 className="flex-grow text-center text-xl font-bold tracking-widest text-white">
          Top Users
        </h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Top Users (Total Spend)</h2>
        {topuser.length > 0 ? (
          topuser.map((user, index) => (
            <div key={index} className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-apin rounded-md flex items-center justify-center text-lg">
                  <img
                    src="assets/athn/premium.webp"
                    alt="User"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-0.5">User: {user.name}</p>
                </div>
              </div>
              <div className="text-right">
              {!!user.usdt && <p className="text-[#1efcb9] font-bold text-sm">{user.usdt}</p>}
                <div className="text-[10px] text-gray-400">Total USDT</div>
              </div>
            </div>
          ))
        ) : (
          <p>No top users found</p>
        )}

        {giftWiseTopUsers.map((giftGroup, idx) => (
          <div key={idx} className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Top Users for {giftGroup.giftName}</h2>
            {giftGroup.users.map((user, index) => (
              <div key={index} className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-apin rounded-md flex items-center justify-center text-lg">
                    <img
                      src="assets/athn/premium.webp"
                      alt="Gift"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Name: {user.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#1efcb9] font-bold text-sm"></p>
                  <div className="text-[10px] text-gray-400">Spent on {giftGroup.giftName}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
