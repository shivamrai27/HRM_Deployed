import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
// Import your existing AttendanceTable component
import AttendanceTable from './AttendanceTable.jsx';

const LeaveLog = () => {
    const [leaveData, setLeaveData] = useState([]);
    
    // Function to fetch leave data
    const fetchLeaveData = async () => {
      try {
        // Get employeeId from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const employeeId = storedUser?._id;
  
        if (!employeeId) {
          console.error('Employee ID not found in localStorage');
          return;
        }
  
        // Fetch leave applications from the server
        const response = await axios.get(`http://localhost:5000/leave/getLeaveApplications/${employeeId}`);
        const formattedData = response.data.map(item => ({
          leaveType: item.type,
          from: new Date(item.start).toLocaleDateString(),
          to: new Date(item.end).toLocaleDateString(),
          days: item.days,
          reason: item.reason,
          status: item.status
        }));
  
        // Update state with formatted leave data
        setLeaveData(formattedData);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };
  
    // Fetch data when component mounts
    useEffect(() => {
      fetchLeaveData();
    }, []);
  
    return (
      <div className="bg-white rounded-lg shadow mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Leave Log</h2>
          <button 
            onClick={fetchLeaveData}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-600">Leave Type</th>
                <th className="text-left p-4 font-medium text-gray-600">From</th>
                <th className="text-left p-4 font-medium text-gray-600">To</th>
                <th className="text-left p-4 font-medium text-gray-600">Days</th>
                <th className="text-left p-4 font-medium text-gray-600">Reason</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((record, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">{record.leaveType}</td>
                  <td className="p-4">{record.from}</td>
                  <td className="p-4">{record.to}</td>
                  <td className="p-4">{record.days}</td>
                  <td className="p-4">{record.reason}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        record.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

const TabbedLogs = () => {
  const [activeTab, setActiveTab] = useState('attendance');

  return (
    <div>
      <div className="flex space-x-1 mx-4 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'attendance'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Attendance Log
        </button>
        <button
          onClick={() => setActiveTab('leave')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leave'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Leave Log
        </button>
      </div>

      {activeTab === 'attendance' ? <AttendanceTable /> : <LeaveLog />}
    </div>
  );
};

export default TabbedLogs;