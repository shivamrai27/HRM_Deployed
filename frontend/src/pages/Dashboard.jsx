import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Stats from '../components/Stats.jsx';
import TabbedLogs from '../components/TabbedLogs.jsx';
// import CalendarSection from '../components/CalendarSection .jsx';
import UpcomingHolidays from '../components/UpcomingHolidays.jsx';


// Dashboard component code as shown in previous artifact...

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="p-4">
          <Header />
          <Stats />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            <TabbedLogs />  {/* Replace AttendanceTable with TabbedLogs */}
          </div>
          <div>
            <UpcomingHolidays />
          </div>
        </div>
      </div>
    </div>
  );
  };
  export default Dashboard;