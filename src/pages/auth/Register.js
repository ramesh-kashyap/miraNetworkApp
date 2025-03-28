import  React,{ useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const requestSent = useRef(false);
    const telegramUser = {
        name : name,
        email: email,
        phone: phone,
        password: password,
    };
    

    const loginUser = async () => {
        if (requestSent.current) return; // Prevent multiple requests
        requestSent.current = true;
    
        const telegramUser = { name, email, phone, password };
    
        try {
          const response = await Api.post("auth/register", telegramUser);
          if (response.data.token) {
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
          } else {
            console.error("❌ Login Error:", response.data.message);
          }
        } catch (error) {
          console.error("❌ API Error:", error.message);
          alert(error.message);
        }
      };
    
    

  return (
    <div className="min-h-screen bg-[#0a0f07] text-white px-4 pt-8 pb-8 relative w-full max-w-md mx-auto">
     
      <div className="absolute inset-0 bg bg-cover bg-center opacity-20 -z-10" />

      
      <button className="w-10 h-10 rounded-xl bg-[#101a19]/60 flex items-center justify-center mb-8 border border-[#1efcb9]/40" onClick={() => navigate("/miningintro")}>
        <span className="text-[#1efcb9] text-xl">←</span>
      </button>

      
      <h1 className="text-4xl font-bold mb-8">Sign up</h1>

      
      <label className="text-sm mb-1 block">Full name *</label>
      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
        />
        <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
      </div>

      
      <label className="text-sm mb-1 block">Email *</label>
      <div className="relative mb-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
        />
        <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
      </div>

     
      <label className="text-sm mb-1 block">Phone number</label>
      <div className="flex items-center gap-2 px-4 py-3 border border-white/10 rounded-xl mb-5">
        <span className="text-lg">🇬🇧</span>
        <span className="text-white/80">+44</span>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40"
        />
      </div>

      <label className="text-sm mb-1 block">Password *</label>
      <div className="relative mb-5">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-3 pl-12 pr-10 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
        />
        <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        <FaEyeSlash className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/60" />
      </div>

      
      <label className="text-sm mb-1 block">Re-enter Password *</label>
      <div className="relative mb-6">
        <input
          type="password"
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full py-3 pl-12 pr-10 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
        />
        <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        <FaEyeSlash className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/60" />
      </div>

      <p className="text-sm text-white/60 mb-6 leading-relaxed">
        By continuing to register, you agree with{" "}
        <a href='' className="underline text-white">Terms of Use</a> and{" "}
        <a href='' className="underline text-white">Privacy policy</a> ours.
      </p>

      <button className="w-full bg-gradient-to-r from-[#1efcb9] to-[#0bc7a2] py-4 rounded-xl text-black font-bold text-lg shadow-md" onClick={loginUser}>
        Sign up
      </button>
    </div>
  );
}