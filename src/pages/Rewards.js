import React, { useState, useEffect } from "react";

import { FaXTwitter, FaTelegram, FaBolt } from "react-icons/fa6";
import { Bell, User, Users, Gift, Trophy, Gamepad, Settings, Pickaxe } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Api from '../services/Api';
import Footer from "../components/Footer";



const Rewards = () => {
  const [tasks, setTasks] = useState([]);
  const [userBalance, setUsebalance] = useState(0);
  const [taskBonus, setTaskBonus] = useState(0);
  const [miningBonus, setMiningBonus] = useState(0);
  const [referralBonus, setreferralBonus] = useState(0);
  const [loadingTasks, setLoadingTasks] = useState({});
  const [claimableTasks, setClaimableTasks] = useState({});
  const telegram_id = localStorage.getItem("telegram_id");
   const [alldata, setAlldata] = useState(null);  // State to store user data
    const [error, setError] = useState(null); 

  useEffect(() => {
    getTaskRecord();
    getUserBalance();
    fetchAlldata();
  }, []);

  const getTaskRecord = async () => {
    try {
      const response = await Api.post("auth/getTasks", { telegram_id });
      setTasks(response.data.buttonTask);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };



  const fetchAlldata = async () => {
    try {
        const response = await Api.get('auth/total-balance');
        setAlldata(response.data);  // Store API response in state
    } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
    }
};









  const getUserBalance = async () => {
    try {
      const response = await Api.get("auth/get-user-balance");
      if (response.data.success) {
        setUsebalance(response.data.userbalance);
        setTaskBonus(response.data.taskBonus);
        setMiningBonus(response.data.miningBonus);
        setreferralBonus(response.data.referralBonus);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleStart = async (taskId, taskUrl) => {
    window.open(taskUrl);
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
    const response = await Api.post("auth/startTask", { telegram_id, task_id: taskId });
    if (!response.data.success) {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
      toast.error(response.data.message);
    }
    else {
      setTimeout(() => {
        setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
        setClaimableTasks((prev) => ({ ...prev, [taskId]: true }));
      }, 5000);
    }

  };

  const handleClaim = async (taskId) => {
    try {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
      await Api.post("auth/claimTask", { telegram_id, task_id: taskId });
      setTimeout(() => {
        setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
        toast.success('claimed successfully!');

        getUserBalance();
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: "completed" } : task
          )
        );
      }, 5000);
    } catch (error) {
      console.error("Error claiming task:", error);
    }
  };

  const pendingTasks = tasks?.filter((task) => task.status !== "completed");
  const finishedTasks = tasks?.filter((task) => task.status === "completed");











  // const task = [

  //   {
  //     id: 1,
  //     icon: <FaXTwitter className="text-white text-2xl" />, 
  //     title: "Join Telegram Miniapp",
  //     points: "+150 POINT",
  //   },
  //   {
  //     id: 2,
  //     icon: <FaXTwitter className="text-white text-2xl" />, 
  //     title: "Connect Your X (Twitter) Account",
  //     points: "+150 POINT",
  //   },
  //   {
  //     id: 3,
  //     icon: <FaTelegram className="text-blue-400 text-2xl" />, 
  //     title: "Join Telegram Channel",
  //     points: "+100 POINT",
  //   },


  //   {
  //     id: 4,
  //     icon: <FaBolt className="text-yellow-400 text-2xl" />, 
  //     title: "Boost Our Telegram Channel",
  //     points: "+100 POINT",
  //   },
  // ];

  const invites = [
    { id: 1, title: "Invite 3 friends", points: "+100 POINT", progress: "1/3" },
    { id: 2, title: "Invite 10 friends", points: "+300 POINT", progress: "1/10" },

    { id: 3, title: "Invite 100 friends", points: "+1000 POINT", progress: "1/100" },
  ];




  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col items-center px-4 pt-8 relative pb-24 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Rewards</h2>

      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center mb-6">
        <h3 className="text-3xl font-bold">{alldata?.totalBalance?? 0}. Points</h3>
        <p className="text-gray-400 text-sm">Total Rewards</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Mining</p>
            <p className="text-lg font-bold">{alldata?.totalBalance?? 0} .pt</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Tasks</p>
            <p className="text-lg font-bold">{alldata?.bonus ?? 0}.pt</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Referral</p>
            <p className="text-lg font-bold">0 pt</p>
          </div>
        </div>
      </div>

      

      <h3 className="text-xl font-bold mb-4">Available Tasks</h3>
      <div className="space-y-4">
        {pendingTasks?.map((task) => (
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
              <img alt={task.name} src={task.icon} className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">{task.name}</p>
                <p className="text-green-400 text-sm">+{task.reward} POINT</p>
              </div>
            </div>

            {claimableTasks[task.id] ? (
              <button onClick={() => handleClaim(task.id)} className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold">   {loadingTasks[task.id] ? "Loading..." : "Claim"}
              </button>
            ) : (
              <button onClick={() => handleStart(task.id, task.link)} className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold" disabled={loadingTasks[task.id]}>   {loadingTasks[task.id] ? "Loading..." : "Start"}</button>
            )}
          </div>
        ))}
      </div>

       {finishedTasks?.length > 0 && (
            <div className="w-full flex flex-col gap-3 mt-6">
              <h4 className="text-base font-semibold text-neutral-1000">Finished Tasks</h4>
              {finishedTasks.map((task) => (
               
               <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow-lg">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
                 <img alt={task.name} src={task.icon} className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="font-semibold">{task.name}</p>
                   <p className="text-green-400 text-sm">+{task.reward} POINT</p>
                 </div>
               </div>
                 <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold">   Finished</button>
             
             </div>

              ))}
            </div>
          )}

      
      <h3 className="text-xl font-bold mt-8 mb-4">Invite Friends</h3>
      <div className="space-y-4 w-full">
        {invites.map((invite) => (
          <div key={invite.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow-lg">
            <div>
              <p className="font-semibold">{invite.title}</p>
              <p className="text-green-400 text-sm">{invite.points}</p>
              <button className="mt-2 bg-white text-black px-5 py-2 rounded-full text-sm font-semibold">Invite</button>
            </div>
            <div className="bg-gray-700 p-2 px-4 rounded-full text-sm font-semibold">{invite.progress}</div>
          </div>
        ))}
      </div>
     

      <Footer />
    </div>
  );
};

export default Rewards;