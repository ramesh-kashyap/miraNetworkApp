import React, { useEffect, useState } from "react";
import { FaGem, FaInfoCircle } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import {useNavigate } from "react-router-dom";
import Api from '../services/Api';
import { Toaster, toast } from 'react-hot-toast';
export default function NodeReward() {
    const navigate = useNavigate();
    const [dailyRewards, setDailyRewards] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [eligibleRewardId, setEligibleRewardId] = useState(null);
    const [todayReward, setTodayReward] = useState(0);
    useEffect(() => {
      fetchRewards();
      Claimed();
    }, [dailyRewards]);

    useEffect(() => {
      let interval;
      if (countdown !== null && countdown > 0) {
          interval = setInterval(() => {
              setCountdown((prev) => {
                  if (prev <= 1000) {
                      clearInterval(interval);
                      setEligibleRewardId(1); // Unlock claim
                      setTodayReward(prev => prev + dailyRewards); // Increase reward
                      return null;
                  }
                  return prev - 1000;
              });
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [countdown]); 
  
  
  //   useEffect(() => {
  //     let interval;
  //     if (dailyRewards === 1) {
  //         interval = setInterval(() => {
  //             setTodayReward(prev => (prev < 24 ? prev + 1 : prev));
  //         }, 3000); // Increase every 3 seconds
  //     }
  //     return () => clearInterval(interval);
  // }, [dailyRewards]);

    const fetchRewards = async () => {
      try {
          const response = await Api.get('auth/baycoin');
          // console.log("API Response:", response.data.data);
          if(response.data){
            setDailyRewards(response.data.data.hour_bal);
            // console.log(response.data.data.hour_bal);
          }
          else {
            console.error("API Response:", error);
            // throw new Error('Failed to fetch ');
          }
      } catch (error) {
        console.error("❌ Fetching rewards failed:", error,{ duration: 1000 });
      }
    };

    const Claimed = async () => {
      try {
          const response = await Api.get("auth/claim-day");
  
          if (!response?.data) {
              toast.error("❌ Failed to fetch claim data", { duration: 1000 });
              return;
          }
  
          const { lastClaimed } = response.data;
          if (lastClaimed) {            
              const lastClaimedTimestamp = new Date(lastClaimed).getTime();
              const nowTimestamp = Date.now();
              const timeRemaining = 24 * 60 * 60 * 1000 - (nowTimestamp - lastClaimedTimestamp);
              // console.log("now claim".timeRemaining);
              if (timeRemaining <= 0) {
                  setEligibleRewardId(1); // Allow claim
                  setCountdown(null);
                  setTodayReward(dailyRewards * 24);

              } else {
                  setEligibleRewardId(null); // Block claim
                  startCountdown(timeRemaining); // Start countdown timer
                  const timePassed = (24 * 60 * 60 * 1000 - timeRemaining) / 1000;
                    setTodayReward(timePassed * (dailyRewards / 3600));

              }
          } else {
              setEligibleRewardId(1); // First claim
              setTodayReward(dailyRewards * 24);
          }
  
      } catch (error) {
          toast.error(`❌ ${error.message}`, { duration: 1000 });
      }
  };
  
  // Function to start the countdown
  const startCountdown = (timeRemaining) => {
      setCountdown(timeRemaining);
  
      const interval = setInterval(() => {
          setCountdown((prev) => {
              if (prev <= 1000) {
                  clearInterval(interval);
                  setEligibleRewardId(1); // Enable claim after countdown ends
                  return null;
              }
              return prev - 1000;
          });
      }, 1000);

      const rewardInterval = setInterval(() => {
        setTodayReward((prev) => {
            if (countdown <= 0) {
                clearInterval(rewardInterval);
                return prev;
            }
            return prev + (dailyRewards / 3600) * 3;
        });
    }, 3000);


  };
  
  // Convert countdown to HH:MM:SS format
  const formatTime = (ms) => {
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleClaim = async (reward) => {
    if (!eligibleRewardId) {
        toast.error("❌ You must wait 24 hours before claiming the next reward!", { duration: 1000 });
        return;
    }

    try {
        const response = await Api.post('auth/claim-reward', { mcoin: todayReward });
        if (response?.data?.success) {
            toast.success("🎉 Reward claimed successfully!", { duration: 1000 });
            Claimed(); // Refresh claim status after claiming
        } else {
            throw new Error("Claim failed");
        }
    } catch (error) {
        toast.error("❌ Somthing Wrong, Try Again!", { duration: 1000 });
    }
};

  return (
    <div className="min-h-screen airobg text-white flex flex-col items-center px-4 pt-8 pb-24 w-full max-w-md mx-auto font-sans relative overflow-hidden">
       <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="/assets/images/Airobg.mp4" type="video/mp4" />
  </video>
  <div className="absolute top-0 left-0 w-full h-full airoOverlay z-10"></div>
      <div className="absolute inset-0 z-0 opacity-10 animate-pulse text-[#1efcb9] text-[8px] leading-3 tracking-widest select-none">
        <div className="absolute top-0 left-4 rotate-[-20deg] whitespace-pre-line">
          {"011010010\n011010\n1100\n10011\n0100\n101"}
        </div>
        <div className="absolute bottom-0 right-4 rotate-[15deg] whitespace-pre-line">
          {"100101\n10110\n1000\n11011\n101\n001"}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="relative z-10 flex w-full mb-6 rounded-xl overflow-hidden shadow-md">
        <button className="flex-1 text-center py-3 bg-apin1 text-gray-400 font-medium text-sm" onClick={() => navigate("/tapgame")}>TAP</button>
        <button className="flex-1 text-center py-3 bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black font-bold text-sm tracking-wide">YOUR NODE</button>
      </div>

      <div className="relative z-10 text-center mb-10 pt-4">
        <div className="text-4xl font-extrabold text-[#1efcb9] flex justify-center items-center gap-2">
        {dailyRewards} 
        <img src="assets/images/gemcoin.png" alt="gemcoin" style={{width:30, height: 20}}/>
        {/* <FaGem className="text-[#1efcb9] text-2xl" /> */}
        </div>
        <p className="text-white tracking-widest text-sm mt-2 flex justify-center items-center gap-1">
          EVERY HOUR <FaInfoCircle className="text-sm text-gray-400" />
        </p>
      </div>

      <div className="relative z-10 w-full bg-apin1 border border-[#1efcb9]/20 rounded-2xl px-6 py-6 text-center mb-10 shadow-xl">
        <div className="text-4xl font-extrabold text-[#1efcb9] mb-2 flex justify-center items-center gap-2">
        {todayReward.toFixed(4)}
        <img src="assets/images/gemcoin.png" alt="gemcoin" style={{width:30, height: 20}}/>
        {/* <FaGem className="text-[#1efcb9] text-xl" /> */}
        </div>
        <p className="text-sm text-gray-300 mb-1 tracking-wide"> {countdown !== null ? formatTime(countdown) : "00h 00m 00s"}</p>
        <p className="text-xs text-gray-400">Time until the next reward</p>
        
        <button 
    onClick={() => handleClaim({ id: eligibleRewardId })}
    disabled={!eligibleRewardId}
    className={`mt-4 w-full py-2 rounded-xl font-semibold text-sm border border-[#333] 
        ${eligibleRewardId ? "bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-white cursor-pointer" : "bg-[#1a1a1a] text-gray-500 cursor-not-allowed"}`}
>
    Claim
</button>
      </div>

      <div className="relative z-10 w-full bg-gradient-to-r from-[#2b2b2b] to-[#1a1a1a] py-3 px-4 rounded-xl text-center text-yellow-300 font-bold text-sm mb-6 shadow-sm">
        GET AN EXTRA 300% BOOSTER
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
        <div className="bg-apin1 border border-[#1efcb9]/20 rounded-xl px-4 py-5 text-center">
          <div className="text-2xl font-bold text-[#1efcb9] mb-1 flex items-center justify-center gap-1">
            2.12 
            <img src="assets/images/gemcoin.png" alt="gemcoin" style={{width:40, height: 30}}/>
            {/* <FaGem className="text-[#1efcb9] text-lg" /> */}
          </div>
          <p className="text-xs text-white">Basic Harvest Rate</p>
        </div>
        <div className="bg-apin1 border border-[#1efcb9]/20 rounded-xl px-4 py-5 text-center">
          <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-1">
            0% <IoRocketOutline className="text-xl text-[#1efcb9]" />
          </div>
          <p className="text-xs text-white">Booster Coefficient</p>
        </div>
      </div>

      <Footer/>

    </div>
  );
}
