import React, { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from '../../services/Api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await Api.post("auth/login", { email, password });
      if (response.data.status) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen imgbg text-white flex flex-col justify-between px-4 pt-6 pb-8 w-full max-w-md mx-auto font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0  bg-cover bg-center opacity-30 blur-sm"></div>

      <div className="relative z-10 w-full">
        <button
          className="w-10 h-10 rounded-xl bg-apin/60 flex items-center justify-center mb-8 border border-[#1efcb9]/20 backdrop-blur-md"
          onClick={() => navigate("/miningintro")}
        >
          <FaArrowLeft className="text-[#1efcb9] text-lg" />
        </button>

        <h1 className="text-4xl font-bold mb-12 leading-tight">
          Welcome <span className="text-[#1efcb9]">back</span>
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="text-sm text-white block mb-1">Your email</label>
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} style={{color:'#000'}}
                className="w-full py-4 pl-12 pr-4 bg-apin/60 border border-white/10 rounded-xl text-sm text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1efcb9]/50 backdrop-blur-md"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)} style={{color:'#000'}}
                className="w-full py-4 pl-12 pr-10 bg-apin/60 border border-white/10 rounded-xl text-sm text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1efcb9]/50 backdrop-blur-md"
              />
              <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#1efcb9]" />
              <FaEyeSlash className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="text-right mb-8">
            <a href="#" className="text-sm text-[#1efcb9] underline">Forgot password</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-black font-bold text-center shadow-xl bg-gradient-to-br from-[#1efcb9] to-[#108b75] focus:outline-none focus:ring-2 focus:ring-[#1efcb9]/50 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
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
