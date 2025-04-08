import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // if you're using react-router

export default function ProfileSettings() {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/login"); // Redirect to login page
      };
  const [is2FA, setIs2FA] = useState(false);
  const [isBiometric, setIsBiometric] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0f07] text-white px-4 pt-8 pb-24 w-full max-w-md mx-auto font-sans">
      <div className="flex justify-between items-center mb-6">
        <button className="text-2xl text-[#1efcb9]">←</button>
        <h2 className="text-lg tracking-widest font-semibold">PROFILE</h2>
        <div />
      </div>

      <div className="bg-[#101a19] rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-lg font-semibold">Rames</p>
            <p className="text-sm text-[#ffffff]">Level 23</p>
          </div>
          <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-md text-sm">Premium</span>
        </div>

        <div className="w-full h-2 bg-[#333] rounded-full mb-1">
          <div className="h-2 bg-[#1efcb9] rounded-full w-[70%]" />
        </div>
        <div className="text-sm flex justify-between text-[#ffffff]">
          <span>370,270.07 / 538,691.59 💎</span>
          <span>Level 24</span>
        </div>
      </div>

      <div className="space-y-4 text-sm">

        {[
          { title: 'Account Information' },
          { title: 'Linked Accounts' },
        ].map((item) => (
          <SettingItem key={item.title} title={item.title} />
        ))}



        <SettingItem title="Change Password"  link="/account-info"  />
        <SettingItem title="Change Email" />
        
        <div className="mt-10 space-y-4 text-sm border-t border-white/10 pt-4">
  
          <SettingItem title="About Athene Network" />
          <SettingItem title="User Guides" />
          <SettingItem title="Support" />
          
          <div className="flex justify-between items-center border-b border-white/10 py-3">
            <span>Version</span>
            <span className="text-[#ffffff] font-semibold text-sm">2.2.1</span>
          </div>
  
          <div className="flex justify-between items-center pt-4">
            <button                onClick={handleLogout}
 className="text-red-500 font-semibold text-sm">Sign Out</button>
            <FaChevronRight className="text-red-500 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingItem({ title, badge, badgeColor, link }) {
  const content = (
    <div className="flex justify-between items-center py-3 border-b border-white/10">
      <span>{title}</span>
      <div className="flex items-center gap-2">
        {badge && (
          <span className={`px-3 py-1 text-xs rounded-md ${badgeColor || 'bg-gray-700'} text-white`}>
            {badge}
          </span>
        )}
        <FaChevronRight className="text-white/60 text-sm" />
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="block hover:bg-white/5 rounded-md px-2 -mx-2 transition">
      {content}
    </Link>
  ) : (
    <div className="px-2 -mx-2">{content}</div>
  );
}

