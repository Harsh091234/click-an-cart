import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import React, { use, useState } from 'react'
import { useUserStore } from '../../store/useUserStore';

const SwitchRoleButton = () => {
    const {switchLoading, user, toggleRole} = useUserStore();
     const [hover, setHover] = useState(false);
     const navigate = useNavigate();
     const handleClick = async() => {
      await toggleRole();
      if(user.role === "buyer") return navigate("/seller");
     return navigate("/");
  }

  return (
     <button
 
 
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute bottom-10 right-10 flex items-center justify-center rounded-full bg-sky-500 text-white 
                   hover:bg-white hover:text-sky-500 p-3 shadow-lg transition-all duration-300"
      >
        <RefreshCw size={17} />

        {/* Hover label */}
        {hover && !switchLoading && (
        <span
          className="absolute -top-10 right-0 bg-white text-sky-600 text-xs px-3 py-1 rounded-lg 
                     shadow-md transition-all duration-300 whitespace-nowrap"
        >
          Switch to {user.role === "buyer" ? "Seller" : "Buyer"}
        </span>
      )}
      </button> 
  )
}

export default SwitchRoleButton
