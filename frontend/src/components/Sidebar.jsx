import React, { useState } from 'react';
import { Calendar, Clock, Home, LogOut, Settings, User, HelpCircle, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
      { icon: <Home className="w-5 h-5" />, label: 'Home', active: true },
      { icon: <User className="w-5 h-5" />, label: 'My Attendance' },
      { icon: <Calendar className="w-5 h-5" />, label: 'My Leave' },
      { icon: <Building2 className="w-5 h-5" />, label: 'Company Details' },
      { icon: <Settings className="w-5 h-5" />, label: 'Profile & Settings' },
    ];

    const handleLogout = () => {
        // Clear all cookies (you may need to specify the domain/path depending on your setup)
        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });

        // Clear localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to login page
        navigate('/login');
    };

    return (
      <div className="w-64 h-screen bg-white border-r p-4">
        <div className="p-4">
          <img src="/logo.png" alt="Fluidesigns" className="h-8" />
        </div>
        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-6 py-3 text-sm ${
                item.active ? 'bg-black text-white rounded-md' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 border-t">
          <a onClick={handleLogout} className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <HelpCircle className="w-5 h-5" />
            <span className="ml-3">Help</span>
          </a>
          <a onClick={handleLogout} className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </a>
        </div>
      </div>
    );
};

export default Sidebar;


//======================lucid way==========================
// const Sidebar = () => {
//     const menuItems = [
//       { icon: <Home className="w-5 h-5" />, label: 'Home', active: true },
//       { icon: <User className="w-5 h-5" />, label: 'My Attendance' },
//       { icon: <Calendar className="w-5 h-5" />, label: 'My Leave' },
//       { icon: <Building2 className="w-5 h-5" />, label: 'Company Details' },
//       { icon: <Settings className="w-5 h-5" />, label: 'Profile & Settings' },
//     ];
  
//     return (
//       <div className="w-64 h-screen bg-white border-r">
//         <div className="p-4">
//           <img src="/logo.png" alt="Fluidesigns" className="h-8" />
//         </div>
//         <nav className="mt-8">
//           {menuItems.map((item, index) => (
//             <a
//               key={index}
//               href="#"
//               className={`flex items-center px-6 py-3 text-sm ${
//                 item.active ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               {item.icon}
//               <span className="ml-3">{item.label}</span>
//             </a>
//           ))}
//         </nav>
//         <div className="absolute bottom-0 w-64 border-t">
//           <a href="#" className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-100">
//             <HelpCircle className="w-5 h-5" />
//             <span className="ml-3">Help</span>
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-100">
//             <LogOut className="w-5 h-5" />
//             <span className="ml-3">Logout</span>
//           </a>
//         </div>
//       </div>
//     );
//   };

//=================original svg icons===============================
// const Sidebar = () => {
//     const menuItems = [
//       { icon: <ReactSVG src="../assets/icons/home.svg" className="w-5 h-5" />, label: 'Home', active: true },
//       { icon: <ReactSVG src="../assets/icons/attendence.svg" className="w-5 h-5" />, label: 'My Attendance' },
//       { icon: <ReactSVG src="../assets/icons/leave.svg" className="w-5 h-5" />, label: 'My Leave' },
//       { icon: <ReactSVG src="../assets/icons/company.svg" className="w-5 h-5" />, label: 'Company Details' },
//       { icon: <ReactSVG src="../assets/icons/profile.svg" className="w-5 h-5" />, label: 'Profile & Settings' },
//     ];
  
//     return (
//       <div className="w-64 h-screen bg-white border-r">
//         <div className="p-4">
//           <img src="/logo.png" alt="Fluidesigns" className="h-8" />
//         </div>
//         <nav className="mt-8">
//           {menuItems.map((item, index) => (
//             <a
//               key={index}
//               href="#"
//               className={`flex items-center px-6 py-3 text-sm ${
//                 item.active ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               {item.icon}
//               <span className="ml-3">{item.label}</span>
//             </a>
//           ))}
//         </nav>
//         <div className="absolute bottom-0 w-64 border-t">
//           <a href="#" className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-100">
//             <ReactSVG src="../assets/icons/help.svg" className="w-5 h-5" />
//             <span className="ml-3">Help</span>
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-100">
//             <ReactSVG src="../assets/icons/logout.svg" className="w-5 h-5" />
//             <span className="ml-3">Logout</span>
//           </a>
//         </div>
//       </div>
//     );
//   };
