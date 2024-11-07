import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchAttendance();
  }, [page]);

  const fetchAttendance = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const limit = 10;
      const skip = page * limit;
      const response = await axios.get(`https://hrm-deployed.vercel.app//attendance?limit=${limit}&skip=${skip}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setAttendanceData(response.data.data);
        setTotalRecords(response.data.totalRecords);
      } else {
        setError('Failed to fetch attendance data');
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setError(error.response?.data?.message || 'Failed to fetch attendance data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };


  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-white rounded-lg shadow mx-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-white rounded-lg shadow mx-4">
        <div className="text-red-500 text-center">
          <p className="font-medium">Error loading attendance data</p>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="bg-white rounded-lg shadow mx-4">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Attendance Log</h2>
        <button 
          onClick={fetchAttendance}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          Refresh
        </button>
      </div>
  
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px] bg-white rounded-lg shadow mx-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[400px] bg-white rounded-lg shadow mx-4">
          <div className="text-red-500 text-center">
            <p className="font-medium">Error loading attendance data</p>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      ) : attendanceData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No attendance records found
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-600">Date</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Clock In</th>
                  <th className="text-left p-4 font-medium text-gray-600">Clock Out</th>
                  <th className="text-left p-4 font-medium text-gray-600">Duration</th>
                  <th className="text-left p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr
                    key={`${record.date}-${index}`}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">{record.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-md text-sm ${getStatusBadgeColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4">{record.checkIn}</td>
                    <td className="p-4">{record.checkOut}</td>
                    <td className="p-4">{record.duration}</td>
                    <td className="p-4">
                      {record.checkOut === 'N/A' ? (
                        <span className="text-gray-400">Pending Check Out</span>
                      ) : (
                        <>
                          <button className="text-blue-600 hover:text-blue-800">
                            Get Approval
                          </button>
                          <hr className="border-gray-200 w-20 my-1" />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end p-4 gap-2">
            {page > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                Previous
              </button>
            )}
            {attendanceData.length < totalRecords && (
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default AttendanceTable;