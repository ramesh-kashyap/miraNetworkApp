import React , { useState,useEffect }from 'react';
import { FaUserEdit, FaTimes ,FaArrowLeft } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';
import { Toaster, toast } from 'react-hot-toast';
export default function ProfileEdit() {
    const [userInfo, setUserInfo] = useState({
      name: "",
      phone:"",
    }); // ✅ Default username
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

     useEffect(()=>{
      coins();
     },[])
  

  const coins = async () =>{
    try{
      const response = await Api.get('auth/coins');
       if(response.data){
        setUserInfo(response.data.data);
       }  
    }
    catch{
      console.error("Somthing is write");
    }
  }


  const handleChange =(e) =>{
    const {name, value}= e.target;
    setUserInfo((prev)=>({
      ...prev,
        [name]:value,
    }));
    console.log("Sending update request", userInfo.phone);
  };


  const handlelogout =() =>{
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/miningintro");
  }
  

  const handleUpdate = async() =>{
    console.log(userInfo.phone);
    try{
      const response = await Api.post('auth/updateprofile',{
        name: userInfo.name,
        phone :userInfo.phone,
       }) 
       if(response.data.success){
         toast.success("Your Details Update Sucessfully");
       }
    }
  catch(error){
    console.error("Error updating profile:", error);
  }
  }


  return (
    <div className="min-h-screen imgbg bg-[#0a0f07] text-white px-4 pt-10 pb-8 w-full max-w-md mx-auto font-sans relative">
    <Toaster position="top-right" reverseOrder={false} />
      {/* Header */}
      <div className="flex items-center w-full mb-8">
        <button className="bg-[#1a1a1a] p-3 rounded-full" onClick={() => navigate("/")}>
          <FaArrowLeft className="text-white text-lg" />
        </button>
        <h2 className="flex-grow text-center text-xl font-light tracking-widest">
          Personal Profile
        </h2>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative w-28 h-28">
          <div className="w-full h-full rounded-full bg-[#1efcb9]/20 flex items-center justify-center text-5xl">
          <img src="/assets/klink4.svg" alt="Slide 1" style={{width:'100%'}}/>
          </div>
        
        </div>
      </div>

      <label className="text-sm mb-1 block">Full name</label>
  
      <input
        type="text"
        name="name"
        value={userInfo.name} 
        onChange={handleChange}
        className="w-full py-3 px-4 mb-5 bg-transparent border border-white/10 rounded-xl text-white placeholder:text-white/40"
      />

      <label className="text-sm mb-1 block">Your email</label>
      <p className="text-white mailto:mb-5">{userInfo.email}</p>
      <br />
      <label className="text-sm mb-1 block">Phone number</label>
      <div className="flex items-center gap-2 px-4 py-3 border border-white/10 rounded-xl mb-5">
        {/* <span className="text-lg">🇮🇳</span>
        <span className="text-white/80">+91</span> */}
        <input
          type="tel"
          onChange={handleChange}
          name="phone"
          value={userInfo.phone}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40"
        />

      </div>

      <label className="text-sm mb-1 block">Referral Code</label>
      <div className="relative mb-6">
        <input
          type="text"  value={userInfo.refrial_code}
          placeholder="Referral Code"
          className="w-full py-3 pl-4 pr-12 bg-transparent border border-white/10 rounded-xl text-white placeholder:text-white/40"
        />
        <FaQrcode className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#1efcb9]" />
      </div>

      <div className="text-left mb-6">
        <button className="text-red-500 underline text-sm" onClick={() => setIsOpen(true)}>Sign Out </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-apin p-6 rounded-xl shadow-lg text-center w-[90%] max-w-md relative">
            
            <button
              className="absolute top-4 right-4 text-white hover:text-red-400"
              onClick={() => setIsOpen(false)}
            >
               <FaTimes size={18} />
            </button>
            <h3 className="text-3xl font-bold text-white">Sign Out</h3>
            <p className="text-sm text-gray-300">Are you Sure , want to Sign out!</p>

             <button className="mt-4 w-full bg-gradient-to-r from-[#1efcb9] to-[#108b75] text-black text-lg font-semibold py-3 rounded-full shadow-md" onClick={()=>handlelogout()}>
        Logout
      </button>
          </div>
        </div>
      )}

      <button className="w-full bg-gradient-to-r from-[#1efcb9] to-[#0bc7a2] py-4 rounded-xl text-black font-bold text-lg shadow-md" onClick={()=>handleUpdate()}>
        Update  
      </button>
    </div>
  );
}