import { NavLink } from "react-router-dom";
import { Home, MessageCircle, CreditCard, HeartPulse, Menu } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all ${isOpen ? "w-64" : "w-16"} flex flex-col absolute`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-3 text-gray-400 hover:text-white focus:outline-none"
      >
        <Menu size={24} />
      </button>
      
      <nav className="mt-6 flex flex-col space-y-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}
        >
          <Home size={20} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>
        
        <NavLink 
          to="/credit" 
          className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}
        >
          <CreditCard size={20} />
          {isOpen && <span>Credit Score</span>}
        </NavLink>

        <NavLink 
          to="/health" 
          className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}
        >
          <HeartPulse size={20} />
          {isOpen && <span>Health Score</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
