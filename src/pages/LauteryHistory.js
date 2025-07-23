import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';

export default function Lauterylist() {
  const navigate = useNavigate();
  const [lauteryData, setLauteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLautery = async () => {
    try {
      const response = await Api.get('auth/totalautery');
      console.log(response.data);
      setLauteryData(response.data.data); // Store API response in state
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLautery();
  }, []);

  return (
    <div className="min-h-screen imgbg text-white px-4 pt-6 pb-24 w-full max-w-md mx-auto font-sans">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate("/")} className="p-2 w-10 h-10 rounded-xl bg-apin border border-[#1efcb9]/20 flex items-center justify-center shadow-md">
          <FaArrowLeft size={18} className="text-[#1efcb9]" />
        </button>
        <h1 className="flex-grow text-center text-xl font-light tracking-widest" style={{ paddingRight: '36px' }}>Lottery List</h1>
      </div>

      <div className="space-y-4">
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && lauteryData.length === 0 && (
          <p className="text-gray-400">No lottery entries found.</p>
        )}

        {lauteryData.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-apin text-[#1efcb9] rounded-md flex items-center justify-center text-lg">
                <img src="assets/athn/premium.webp" alt="Lottery Icon" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5">{item.gift_name || 'Unnamed Gift'}</p>
                <p className="text-xs text-gray-400 font-mono">Lautery No: {item.lautery_no}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-sm">{item.gift_amount} $</p>
              <div className="flex items-center justify-end gap-1">
                <span className="text-[10px] text-gray-400">User ID: {item.userId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
