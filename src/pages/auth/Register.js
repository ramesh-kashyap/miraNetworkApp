import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from '../../services/Api';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import 'react-phone-input-2/lib/style.css';





export default function SignUp() {
  const navigate = useNavigate();

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    referralCode: "",
    countryCode:"",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullName, email, phone, password, repeatPassword, referralCode,countryCode } = formData;

    // Basic validations
    if (!fullName || !email || !phone || !password || !repeatPassword ||!countryCode) {
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
        countryCode,
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
        className="w-10 h-10 rounded-xl bg-apin/60 flex items-center justify-center mb-8 border border-[#1efcb9]/20"
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
            className="w-full py-3 pl-12 pr-4 bg-apin border border-[#cb86ff] rounded-xl placeholder:text-white/40"
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
            className="w-full py-3 pl-12 pr-4 bg-apin border border-[#cb86ff] rounded-xl placeholder:text-white/40"
          />
          <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        </div>

        {/* Phone */}
        <div className="relative mb-5">
  <div className="flex items-center w-full">
    {/* Flag + Country Code Section */}
    <div className="relative flex items-center bg-[rgb(78_78_78_/_40%)]  rounded-l-xl px-2 h-[53px] text-white text-base min-w-[85px]">
      {/* Flag Selector (PhoneInput) */}
      <PhoneInput
        defaultCountry="IN"
        value={formData.countryCode}
        onChange={(value, meta) => {
          setFormData({
            ...formData,
            countryCode: meta.country.dialCode,
            country: meta.country.iso2.toUpperCase(),
          });
        }}
        inputClassName="!opacity-0 !w-0"
        containerClassName="!absolute !left-0 !top-0 w-full h-full"
        buttonClassName="!h-full !bg-transparent !border-none z-10 !pl-1 !pr-1"
      />
      {/* Country Code Display */}
      <span className="ml-[-15px] z-0">+{formData.countryCode}</span>
    </div>

    {/* Phone Number Field */}
    <input
      type="text"
      placeholder="Enter phone number"
      value={formData.phone}
      onChange={(e) =>
        setFormData({ ...formData, phone: e.target.value })
      }
      className="!bg-[rgb(78_78_78_/_40%)] !text-white !border-l-0 !border-[#cb86ff] rounded-r-xl pl-4 pr-4 h-[53px] text-base w-full"
    />
  </div>
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
            className="w-full py-3 pl-12 pr-10 bg-apin border border-[#cb86ff] rounded-xl placeholder:text-white/40"
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
            className="w-full py-3 pl-12 pr-10 bg-apin border border-[#cb86ff] rounded-xl placeholder:text-white/40"
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
            className="w-full py-3 pl-12 pr-4 bg-apin border border-[#cb86ff] rounded-xl placeholder:text-white/40"
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
