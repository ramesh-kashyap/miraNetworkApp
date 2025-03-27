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
  FaStar
} from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Footer from "../components/Footer";
import { Toaster, toast } from 'react-hot-toast';
export default function home() {

 

  return (
    <div className="min-h-screen imgbg text-white flex flex-col items-center px-4 pt-6 relative pb-28 w-full max-w-md mx-auto font-sans">
      
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 rounded-full bg-[#1efcb9]/20 flex items-center justify-center text-lg font-bold text-[#42eac2]">
            R
          </div> */}
          <img src="/assets/athn/avt.webp" alt="Slide 1" style={{width: 30}}/>
          <div>
            <p className="font-semibold text-base leading-tight">Rames</p>
            <p className="text-[#42eac2] text-xs">Level 15</p>
          </div>
        </div>
        <div className="flex space-x-4 text-xl text-[#42eac2] items-center">
          <FaCog />
          <FaQrcode />
          <div className="relative">
          <img src="/assets/athn/bell.svg" alt="Slide 1" style={{width: 20}}/>
            {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </div>
          <img src="data:image/webp;base64,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" alt="Slide 1" style={{width: 40}}/>
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
          <img src="/assets/athn/b1.webp" alt="Slide 1"style={{width:412, height: 150}} className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/athn/b2.webp" alt="Slide 2" style={{width:412, height: 150}} className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/athn/b3.webp" alt="Slide 3" style={{width:412, height: 150}} className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/athn/b4.webp" alt="Slide 4" style={{width:412, height: 150}}className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/athn/b5.webp" alt="Slide 5" style={{width:412, height: 150}}className="slide-img" />
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
          <p className="text-3xl font-bold text-[#42eac2] mt-1">1</p>
        </div>
        <div className="bg-gradient-to-r from-[#1efcb9] to-[#108b75] px-5 py-2 rounded-xl text-xs text-black flex items-center gap-2 shadow-md">
          <span>Received 100</span>
          <FaGem className="text-[#1efcb9]" />
        </div>
      </div>

     
      <div className="w-full bg-apin border border-[#1efcb9]/20 rounded-xl p-4  flex justify-between items-center mb-6 shadow-sm">
        <div>
          <p className="text-[#42eac2] text-sm font-semibold leading-snug">COMPLETE QUESTS<br />TO EARN MORE GEM</p>
        </div>
        <button className="bg-gradient-to-r from-[#1efcb9] to-[#108b75] px-5 py-2 rounded-xl text-xs text-black flex items-center gap-2 shadow-md">
          Quest <FaArrowRight />
        </button>
      </div>

     
      <div className="w-full bg-apin border border-[#1efcb9]/20 rounded-xl p-4 mb-4 shadow-sm mt-4">
  <h3 className="text-xs text-white mb-2 font-medium tracking-wide">MINING</h3>
  <div className="grid grid-cols-4 gap-4 text-center">
    <div>
      <img src="/assets/athn/ic_home_tap.webp" alt="TAP" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">TAP</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_node.webp" alt="Node" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Node</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_boost.webp" alt="Boost" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Boost</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_leaderboard.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Leaderboard</p>
    </div>
  </div>
</div>


     
      <div className="w-full bg-apin border border-[#1efcb9]/20 rounded-xl p-4 mb-4 shadow-sm mt-4">
        <h3 className="text-xs text-white mb-2 font-medium tracking-wide">COMMUNITY</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
    <div>
      <img src="/assets/athn/ic_home_statistic.webp" alt="TAP" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">TAP</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_friend.webp" alt="Node" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Node</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_vote.webp" alt="Boost" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Boost</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_telegram.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Leaderboard</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_twitter.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Twitter</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_youtube.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Youtube</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_facebook.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Facebook</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_home.png" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Home</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_support.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Support</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_blog.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Blog</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_sponsor.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Sponsor</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_faucet.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Faucet</p>
    </div>
    <div>
      <img src="/assets/athn/ic_home_telegram.webp" alt="Leaderboard" className="w-10 h-10 mx-auto" />
      <p className="text-white text-xs mt-1">Register</p>
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
        <div className="text-[#42eac2] text-lg">{icon}</div>
      </div>
      <p className="text-xs text-white whitespace-nowrap text-center mt-1 font-medium">{label}</p>
    </div>
  );
}