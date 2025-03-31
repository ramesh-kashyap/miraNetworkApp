import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Api from '../services/Api';
import { toast } from 'react-toastify';

export default function ChangePassword() {
  const [form, setForm] = useState({
    old_password: '',
    password: '',
    password_confirmation: ''
  });
  const [showPass, setShowPass] = useState({
    current: false,
    newPass: false,
    confirm: false
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    if (!form.old_password || !form.password || !form.password_confirmation) {
      toast.error('All fields are required');
      return;
    }
    if (form.password !== form.password_confirmation) {
      toast.error('Passwords must match');
      return;
    }
    try {
      const response = await Api.post('auth/change-password', form);
      toast.success(response.data.message || 'Password updated successfully');
      setForm({ old_password: '', password: '', password_confirmation: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error updating password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f07] text-white px-4 pt-10 pb-24 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      {/* Current Password */}
      <div className="mb-5">
        <label className="block text-sm text-white/70 mb-2">Current Password</label>
        <div className="flex items-center border border-white/30 rounded-xl px-4 py-3">
          <input
            type={showPass.current ? 'text' : 'password'}
            name="old_password"
            value={form.old_password}
            onChange={handleChange}
            placeholder="Enter current password"
            className="bg-transparent outline-none w-full text-white placeholder-white/40 text-sm"
          />
          <button type="button" onClick={() => toggleShow('current')} className="ml-2 text-white/60 text-lg">
            {showPass.current ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div className="mb-5">
        <label className="block text-sm text-white/70 mb-2">New Password</label>
        <div className="flex items-center border border-white/30 rounded-xl px-4 py-3">
          <input
            type={showPass.newPass ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="bg-transparent outline-none w-full text-white placeholder-white/40 text-sm"
          />
          <button type="button" onClick={() => toggleShow('newPass')} className="ml-2 text-white/60 text-lg">
            {showPass.newPass ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="mb-5">
        <label className="block text-sm text-white/70 mb-2">Confirm Password</label>
        <div className="flex items-center border border-white/30 rounded-xl px-4 py-3">
          <input
            type={showPass.confirm ? 'text' : 'password'}
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="bg-transparent outline-none w-full text-white placeholder-white/40 text-sm"
          />
          <button type="button" onClick={() => toggleShow('confirm')} className="ml-2 text-white/60 text-lg">
            {showPass.confirm ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-[#1efcb9] to-[#0bc7a2] mt-8 py-3 rounded-xl font-bold text-black">
        Update Password
      </button>
    </div>
  );
}
