import React, { useState, useEffect } from 'react';
import Api from '../services/Api';
import { Toaster, toast } from 'react-hot-toast';
import {useNavigate } from "react-router-dom";
export default function Premium() {
   const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [airo ,setAirocoin] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(0); 
    const [aironame, setAironame] =useState(0);
    
    // for form use
//   const activeTab = 'bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black font-bold';
//   const inactiveTab = 'bg-apin text-white/50';

const packages = [
    { name: 'Bronze', price: 3 },
    { name: 'Silver', price: 18 },
    { name: 'Golden', price: 58 },
    { name: 'Diamond', price: 174 },
  ];
const handlePackageSelect = (idx) => {
    setSelectedIndex(idx);
    setSelectedPrice(packages[idx].price);
  };
const canPurchase = selectedIndex !== null && airo >= packages[selectedIndex].price;
     useEffect(()=>{
         coins();
       },[])
      
        
       const coins = async () =>{
         try{
           const response = await Api.get('auth/coins');
           console.log("hello")
            if(response.data){
             console.log(response.data.taskbal);
             console.log(response.data.data);
                setAirocoin(response.data.data.airo);
                setAironame(response.data.daxta.aironame);
            }  
         }
         catch{
           console.error("Somthing is write");
         }
       }

       const handleBuy = async () => {
        //  packages.name === aironame;
        if (packages.name === aironame) {
          toast.error("You can only buy the next package or you don't have enough balance.");
          return;
        }
      
        try {
          const response = await Api.post('auth/buy-package', {
            packageName: packages[selectedIndex].name,
            packagePrice: packages[selectedIndex].price,
          });
      
          if (response.data.success) {
            toast.success("Package purchased successfully!", { duration: 1000 });
            // Optionally reload user data or update state
          } else {
            toast.error(response?.data?.message,"❌ Purchase failed!", { duration: 1000 });
            // console.warn("Purchase failed:", response.data.message);
            
          }
        } catch (error) {
          toast.error(response.data?.message,"❌ Error purchasing package!", { duration: 1000 });
        }
      };
      
      

  return (
    <div className="min-h-screen bg-[#0a0f07] text-white px-4 pt-10 pb-32 w-full max-w-md mx-auto font-sans">
        <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center mb-6">
        <button className="text-2xl text-[#1efcb9]" onClick={()=>navigate("/")}>←</button>
        <h1 className="flex-1 text-center text-white font-semibold text-lg tracking-widest">PREMIUM</h1>
      </div>

      {/* <div className="flex rounded-lg overflow-hidden border border-[#1efcb9]/20 mb-4">
        <button
          onClick={() => setCurrency('USD')}
          className={`flex-1 py-2 text-center  ${currency === 'USD' ? activeTab : inactiveTab}`}
        >
          By USD
        </button>
        <button
          onClick={() => setCurrency('ATN')}
          className={`flex-1 py-2 text-center ${currency === 'ATN' ? activeTab : inactiveTab}`}
        >
          By ATN
        </button>
      </div> */}

        <div className="grid grid-cols-2 gap-3 text-center font-semibold mb-6">
        {packages.map((pkg, idx) => (
          <div
            key={pkg.name}
            onClick={() => handlePackageSelect(idx)}
            className={`cursor-pointer rounded-lg py-4 px-3 border transition-all duration-300 ${
              selectedIndex === idx
                ? 'bg-[#1efcb9] text-black border-[#1efcb9]'
                : 'bg-apin text-white/80 border-[#1efcb9]/20'
            }`}
          >
            <p className="text-sm text-white/70">{pkg.name}</p>
            <p className="text-xl text-[#faff00] font-bold">${pkg.price}</p>
          </div>
        ))}
        </div>

      <div className="rounded-xl bg-apin p-4 mb-5 text-center border border-white/10">
        <div className="text-white/70 text-sm mb-1">Number of packages sold</div>
        <div className="text-[#faff00] text-2xl font-bold tracking-widest">279,938</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-apin border border-white/10 rounded-xl px-4 py-6 text-center">
          <div className="text-sm text-white/70 mb-1">Total commission from direct referral (USDT)</div>
          <div className="text-[#faff00] text-lg font-bold">185,779.9</div>
        </div>
        <div className="bg-apin border border-white/10 rounded-xl px-4 py-6 text-center">
          <div className="text-sm text-white/70 mb-1">Total commission from indirect referral (USDT)</div>
          <div className="text-[#faff00] text-lg font-bold">78,300.5</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 text-center py-6 text-sm tracking-wide bg-apin text-white mb-5">
        TOP 100 USERS<br />RECEIVING COMMISSIONS
      </div>

      <div className="rounded-xl border border-white/10 text-center py-4 text-sm tracking-wide bg-apin text-white mb-5">
      ATN REVENUE SHARING
      </div>

      <div className="bg-apin border border-[#1efcb9]/20 rounded-2xl px-5 py-6 text-white shadow-lg">
       

        <h3 className="text-white font-semibold text-sm mb-4">Benefits of Bronze package</h3>
        <ul className="space-y-4 text-sm text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-[#1efcb9]">◆</span>
            Increase mining speed (Booster) to 300% on the Athene app.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1efcb9]">◆</span>
            Entitled to profit-sharing benefits in ATN every month.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1efcb9]">◆</span>
            No need for KYC: Enjoy converting coins between accounts without hassle.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1efcb9]">◆</span>
            Freedom to load assets into Athene ecosystem products: Athene Gaming, Athene Prediction, Athene Flappy Lion, Athene Launchpad...
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#1efcb9]">◆</span>
            And many other special benefits to enhance your experience.
          </li>
        </ul>

        {/* <button className="mt-8 w-full py-3 bg-gradient-to-r from-[#1efcb9] to-[#9f1eff] text-black font-semibold rounded-full text-sm">
          Restore Purchase
        </button> */}
        {canPurchase && (
        <div className="fixed top-[400px] left-1/2 transform -translate-x-1/2 w-[400px]">
          <button className="w-full py-3 bg-gradient-to-r from-[#1efcb9] to-[#9f1eff] text-black font-semibold rounded-full text-sm text-center" onClick={handleBuy}>
          Buy {packages[selectedIndex]?.name} AIRO {selectedPrice}
       </button>
        </div>
         )}

      </div>        

    </div>
  );
}



