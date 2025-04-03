import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from '../../services/Api';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";







export default function SignUp() {
  const navigate = useNavigate();

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    referralCode: "",
    country:"",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullName, email, phone, password, repeatPassword, referralCode,country } = formData;

    // Basic validations
    if (!fullName || !email || !phone || !password || !repeatPassword ||!country) {
      toast.error("⚠️ All fields are required!");
      setLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      toast.error("⚠️ Passwords do not match!");
      setLoading(false);
      return;
    }


    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!strongPassword.test(password)) {
      toast.error("⚠️ Password must be at least 6 characters, include 1 uppercase, 1 lowercase, and 1 number.");
      setLoading(false);
      return;
    }

    try {
      const response = await Api.post("auth/register", {
        fullName,
        email,
        phone,
        password,
        country,
        repeatPassword,
        referralCode,
      });

      if (response.data.status) {
        toast.success("✅ Registration successful!");
        setFormData(initialState);
        navigate("/login"); // optional
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.message || "Registration failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen imgbg text-white px-4 pt-8 pb-8 w-full max-w-md mx-auto">
      <button
        className="w-10 h-10 rounded-xl bg-[#101a19]/60 flex items-center justify-center mb-8 border border-[#1efcb9]/40"
        onClick={() => navigate("/miningintro")}
      >
        <span className="text-[#1efcb9] text-xl">←</span>
      </button>

      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold mb-8">Sign up</h1>

        {/* Full Name */}
        <label className="text-sm mb-1 block">Full name *</label>
        <div className="relative mb-5">
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full py-3 pl-12 pr-4 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
          />
          <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        </div>

        {/* Email */}
        <label className="text-sm mb-1 block">Email *</label>
        <div className="relative mb-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-3 pl-12 pr-4 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
          />
          <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        </div>

        {/* Phone */}
        <div className="relative mb-5">
        <PhoneInput
  defaultCountry="IN"
  value={formData.phone}
  onChange={(value, meta) => {
    setFormData({
      ...formData,
      phone: value, 
      countryCode: meta.country.dialCode, 
      country: meta.country.iso2.toUpperCase() 
    });
  }}
  inputClassName="!bg-transparent !text-white !border-white/10 !rounded-xl !pl-12 !pr-4 !h-[53px] !text-base w-full"
  containerClassName="w-full !h-[55px]"
  buttonClassName="!h-[55px] !border-r !border-white/10 !bg-transparent"
/>
</div>

        {/* Password */}
        <label className="text-sm mb-1 block">Password *</label>
        <div className="relative mb-5">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full py-3 pl-12 pr-10 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
          />
          <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
          <FaEyeSlash className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/60" />
        </div>

        {/* Confirm Password */}
        <label className="text-sm mb-1 block">Re-enter Password *</label>
        <div className="relative mb-6">
          <input
            type="password"
            name="repeatPassword"
            placeholder="Re-enter Password"
            value={formData.repeatPassword}
            onChange={handleChange}
            className="w-full py-3 pl-12 pr-10 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
          />
          <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
          <FaEyeSlash className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/60" />
        </div>

        {/* Referral Code */}
        <label className="text-sm mb-1 block">Referral Code (Optional)</label>
        <div className="relative mb-5">
          <input
            type="text"
            name="referralCode"
            placeholder="Referral code"
            value={formData.referralCode}
            onChange={handleChange}
            className="w-full py-3 pl-12 pr-4 bg-transparent border border-white/10 rounded-xl placeholder:text-white/40"
          />
          <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        </div>

        {/* Policy */}
        <p className="text-sm text-white/60 mb-6 leading-relaxed">
          By continuing to register, you agree with{" "}
          <a href="#" className="underline text-white">Terms of Use</a> and{" "}
          <a href="#" className="underline text-white">Privacy policy</a>.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#1efcb9] to-[#0bc7a2] py-4 rounded-xl text-black font-bold text-lg shadow-md disabled:opacity-60"
        >
          {loading ? "Registering..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
