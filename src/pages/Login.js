import React from "react";
import { FaArrowLeft, FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#0a0f07] text-white flex flex-col justify-between px-4 pt-6 pb-8 w-full max-w-md mx-auto font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 z-0  bg-cover bg-center opacity-30 blur-sm"></div>

      <div className="relative z-10 w-full">
        <button className="w-10 h-10 rounded-xl bg-[#101a19]/60 flex items-center justify-center mb-8 border border-[#1efcb9]/40 backdrop-blur-md">
          <FaArrowLeft className="text-[#1efcb9] text-lg" />
        </button>

        <h1 className="text-4xl font-bold mb-12 leading-tight">
          Welcome <span className="text-[#1efcb9]">back</span>
        </h1>

        <div className="mb-6">
          <label className="text-sm text-white block mb-1">Your email</label>
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Your email"
              className="w-full py-4 pl-12 pr-4 bg-[#101a19]/60 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1efcb9]/50 backdrop-blur-md"
            />
            <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#1efcb9]" />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-white block mb-1">Password</label>
          <div className="relative w-full">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-4 pl-12 pr-10 bg-[#101a19]/60 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1efcb9]/50 backdrop-blur-md"
            />
            <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#1efcb9]" />
            <FaEyeSlash className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="text-right mb-8">
          <a href="#" className="text-sm text-[#1efcb9] underline">Forgot password</a>
        </div>

        <button className="w-full py-3 rounded-xl text-black font-bold text-center shadow-xl bg-gradient-to-br from-[#1efcb9] to-[#108b75] focus:outline-none focus:ring-2 focus:ring-[#1efcb9]/50 active:scale-95 transition-all">
          Sign in
        </button>
      </div>

      <div className="relative z-10 w-full mt-10">
        <div className="flex items-center justify-center mb-6 text-gray-400 text-sm">
          <span className="border-b border-white/10 flex-1 mr-2"></span>
          Or
          <span className="border-b border-white/10 flex-1 ml-2"></span>
        </div>

        <div className="flex justify-center gap-6">
          <button className="bg-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform">
            <FcGoogle size={22} />
          </button>
          <button className="bg-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform">
            <FaApple size={22} className="text-black" />
          </button>
          <button className="bg-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform">
            <FaFacebookF size={22} className="text-[#1877f2]" />
          </button>
        </div>
      </div>
    </div>
  );
}
