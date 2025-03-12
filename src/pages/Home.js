import React, { useState, useEffect } from "react";
import { Home } from "lucide-react";

const HomePage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 pt-0">
      {/* Header with Logo and Home Icon */}
      <div className="flex justify-between w-full max-w-md items-center mb-8 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-sm shadow-md"></div>
          <h1 className="text-xl font-semibold text-green-600">MeshChain</h1>
        </div>
        <button className="p-2 bg-gray-100 rounded-full shadow-md">
          <Home className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Start Earning Button */}
      <div className="relative flex items-center justify-center mb-12">
        <div className="w-52 h-52 bg-gradient-to-b from-green-400 to-white rounded-full flex flex-col items-center justify-center border-2 border-green-500 shadow-xl">
          <div className="text-black text-5xl mb-2">⏻</div>
          <p className="text-black font-semibold text-lg text-center">Start Earning</p>
        </div>
      </div>

      {/* Log In & Sign Up Buttons */}
      <div className="flex flex-col w-full max-w-md space-y-4">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-medium rounded-full shadow-md">
          Log In
        </button>
        <button className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-medium rounded-full shadow-md">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
