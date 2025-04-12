import React, { useState,useEffect } from 'react';
import {
  FaCog,
  FaBell,
  FaQrcode,
  FaGem,
  FaArrowRight,
  FaChartBar,
  FaUsers,
  FaVoteYea,
  FaTelegramPlane,
  FaYoutube,
  FaHome,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Footer from "../components/Footer";
import { Toaster, toast } from 'react-hot-toast';
import {useNavigate } from "react-router-dom";
import Api from '../services/Api';
export default function home() {
  const [streak, setStreak ] = useState();
  const [streakno, setStreakno] =useState();
  const [username, setUsername] = useState("Guest"); // ✅ Default username

  const navigate = useNavigate(); 
   useEffect(()=>{
    handleStreaktime();
    coins();
   },[])

  const handleStreak = async () =>{
    try {
      const response = await Api.post('auth/streak',{streak: 100});
      console.log("API Response:", response.data);
      if (response?.data?.success) {
        toast.success("✅ 100 coins claimed successfully!", { duration: 1000 });
    } else {
        toast.error(response?.data?.message,"❌ You have already claimed your streak reward today!", { duration: 1000 });
    }
  }
   catch (error) {
    toast.error(response?.data?.message,"❌ Fetching rewards failed:", error,{ duration: 1000 });
  }
  }

    const coins = async () =>{
      try{
        const response = await Api.get('auth/coins');
        console.log("hello")
         if(response.data){
          setUsername(response.data.data.name);
         }  
      }
      catch{
        console.error("Somthing is write");
      }
    }
 
  const handleStreaktime = async () => {
    try {
        const response = await Api.get('auth/streak_time');
        console.log("API Response:", response.data);
        if (response?.data?.isSameDay != null) {
            setStreak(response.data.isSameDay); // Ensure setStreak is defined
            setStreakno(response.data.strekno);
        } else {
            console.error(`${response?.data?.message} ❌ You have already claimed your streak reward today!`);
            setStreak(response.data.isSameDay); 
            setStreakno(response.data.strekno);
        }
    } catch (error) {
        console.error("❌ Fetching rewards failed:", error.message);
    }
};


  return (
    <div className="min-h-screen imgbg text-white flex flex-col items-center px-4 pt-6 relative pb-28 w-full max-w-md mx-auto font-sans">
       <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 rounded-full bg-[#1efcb9]/20 flex items-center justify-center text-lg font-bold text-[#ffffff]">
            R
          </div> */}
          <img src="/assets/klink4.svg" alt="Slide 1"  onClick={() => navigate("/updateprofile")} style={{width: 35}}/>
          <div>
            <p className="font-semibold text-base leading-tight">{username}</p>
            <p className="text-[#ffffff] text-xs">Level 15</p>
          </div>
        </div>
        <div className="flex space-x-4 text-xl text-[#ffffff] items-center">
          <FaCog />
          <FaQrcode />
          <FaBell/>
          <div className="relative">
          {/* <img src="/assets/athn/bell.svg" alt="Slide 1" style={{width: 20}}/> */}
            {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </div>
          <img src="/assets/img/tresure.png" alt="Slide 1" style={{width: 40}}/>
        </div>
      </div>
{/* Swiper Slider with Transitions */}
<Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }} // Auto-scroll every 2 seconds
        loop={true}
        modules={[Autoplay]}
        className="swiper-container"
      >
        <SwiperSlide>
          <img src="/assets/img/aironet.png" alt="Slide 1"style={{width:412, height: 150, borderRadius:10}} className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/img/airdropb.png" alt="Slide 2" style={{width:412, height: 150, borderRadius:10}} className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/img/airdrop1.png" alt="Slide 3" style={{width:412, height: 150, borderRadius:10}} className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/img/airdrop2.png" alt="Slide 4" style={{width:412, height: 150, borderRadius:10}}className="slide-img" />
        </SwiperSlide>
       
      </Swiper>

      {/* <div className="w-full h-28 bg-[#101f1d] rounded-xl mb-5 flex items-center justify-center text-xs text-center text-white px-6 shadow-inner">
        <p className="leading-snug">
          <span className="font-bold text-yellow-400 text-sm">BRAND-NEW MECHANISM</span><br />
          FOR REVENUE SHARING<br />
          <span className="text-[#1efcb9] font-bold">HODL TO EARN</span>
        </p>
      </div> */}

      
      <div
        className="w-full bg-apin border border-[#1efcb9]/20 rounded-xl p-4 flex justify-between items-center mb-4 shadow-sm mt-4">
        <div className="flex flex-col items-center">      
          <p className="text-xs text-gray-400">STREAK</p>
          <div className="flex items-center space-x-1 mt-1">
          <img src="/assets/img/star.gif" alt="TAP" className="w-8 h-8 mx-auto" onClick={()=>navigate("/tapgame")}/>
            <p className="text-3xl font-bold text-white">{streakno}</p>
          </div>
        </div>
        <div
  className={`bg-gradient-to-r from-[#1efcb9] to-[#108b75] px-5 py-2 rounded-xl text-xs text-black flex items-center gap-2 shadow-md ${streak === null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  onClick={streak !== null ? handleStreak : undefined}
  disabled={streak === null}
>
  <span>Received 100</span>
  <FaGem className="text-[#1efcb9]" />
</div>

      </div>

     
      <div className="w-full bg-apin border border-[#1efcb9]/20 rounded-xl p-4  flex justify-between items-center mb-6 shadow-sm">
        <div>
          <p className="text-[#ffffff] text-sm font-semibold leading-snug">COMPLETE QUESTS<br />TO EARN MORE GEM</p>
        </div>
        <button className="bg-gradient-to-r from-[#1efcb9] to-[#108b75] px-5 py-2 rounded-xl text-xs text-black flex items-center gap-2 shadow-md">
          Quest <FaArrowRight />
        </button>
      </div>

     
      <div className="w-full bg-apin border border-[#1efcb9]/20 rounded-xl p-4 mb-4 shadow-sm mt-4">
  <h3 className="text-xs text-white mb-2 font-medium tracking-wide">MINING</h3>
  <div className="grid grid-cols-4 gap-4 text-center">
    <div>
      <img src="/assets/athn/5.png" alt="TAP" className="w-10 h-10 mx-auto" onClick={()=>navigate("/tapgame")}/>
      <p className="text-white text-xs mt-1">TAP</p>
    </div>
    <div>
      <img src="/assets/athn/21.png" alt="Node" className="w-10 h-10 mx-auto"  onClick={()=>navigate("/nodereward")}/>
      <p className="text-white text-xs mt-1">Node</p>
    </div>
    <div>
      <img src="/assets/athn/4.png" alt="Boost" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Boost</p>
    </div>
    <div>
      <img src="/assets/athn/1.png" alt="Leaderboard" className="w-10 h-10 mx-auto" onClick={()=>navigate("/leaderBoard")} />
      <p className="text-white text-xs mt-1">Leaderboard</p>
    </div>
  </div>
</div>


     
      <div className="w-full bg-apin border border-[#1efcb9]/20 rounded-xl p-4 mb-4 shadow-sm mt-4">
        <h3 className="text-xs text-white mb-2 font-medium tracking-wide">COMMUNITY</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
    <div>
      <img src="/assets/athn/2.png" alt="TAP" className="w-10 h-10 mx-auto" onClick={()=>navigate("/tapgame")}/>
      <p className="text-white text-xs mt-1">TAP</p>
    </div>
    <div>
      <img src="/assets/athn/3.png" alt="Node" className="w-10 h-10 mx-auto"  onClick={()=>navigate("/nodereward")}/>
      <p className="text-white text-xs mt-1">Node</p>
    </div>
    <div>
      <img src="/assets/athn/6.png" alt="Boost" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Boost</p>
    </div>
    <div>
      <img src="/assets/athn/8.png" alt="Leaderboard" className="w-10 h-10 mx-auto"onClick={()=>navigate("/leaderBoard")} />
      <p className="text-white text-xs mt-1">Leaderboard</p>
    </div>
    <div>
      <img src="/assets/athn/7.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Twitter</p>
    </div>
    <div>
      <img src="/assets/athn/9.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Youtube</p>
    </div>
    <div>
      <img src="/assets/athn/10.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Facebook</p>
    </div>
    <div>
      <img src="/assets/athn/22.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Home</p>
    </div>
    <div>
      <img src="/assets/athn/20.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Support</p>
    </div>
    <div>
      <img src="/assets/athn/23.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Blog</p>
    </div>
    <div>
      <img src="/assets/athn/19.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Sponsor</p>
    </div>
    <div>
      <img src="/assets/athn/18.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Faucet</p>
    </div>
    <div>
      <img src="/assets/athn/8.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Register</p>
    </div>
    <div>
      <img src="/assets/athn/premium.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" onClick={()=>navigate("/Premium")}/>
      <p className="text-white text-xs mt-1">Premium</p>
    </div>
    <div>
      <img src="/assets/athn/latry.png" alt="Leaderboard" className="w-10 h-10 mx-auto" onClick={()=>navigate("/lautery")}/>
      <p className="text-white text-xs mt-1">Lautery</p>
    </div>
  </div>
      </div>
      <Footer/>
    </div>
  );
}

function RoundIcon({ icon = <FaGem />, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-12 h-12 rounded-full border border-[#1efcb9] flex items-center justify-center bg-[#1efcb9]/10 shadow-sm">
        <div className="text-[#ffffff] text-lg">{icon}</div>
      </div>
      <p className="text-xs text-white whitespace-nowrap text-center mt-1 font-medium">{label}</p>
    </div>
  );
}