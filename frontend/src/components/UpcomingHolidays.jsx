import React from 'react';

const UpcomingHolidays = () => {
  const holidays = [
    { date: '1 Wed, Mon 2025', name: "New Year's Day" },
    { date: '26 Jan, Sun 2025', name: "Republic Day" },
    { date: '14 Feb, Fri 2025', name: "Valentine's Day" },
    { date: '27 March, Thu 2025', name: "My Birthday" },
    { date: '15 Aug, Fri 2025', name: "Independence Day" }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mr-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Upcoming Holidays</h2>
        <button className="text-blue-600 text-sm hover:underline">View All</button>
      </div>
      <div className="space-y-1">
        {holidays.map((holiday, index) => (
          <div key={index}>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">{holiday.date}</span>
              <span className="text-sm text-gray-500">{holiday.name}</span>
            </div>
            {index !== holidays.length - 1 && (
              <div className="border-b border-gray-200 w-[95%] mx-auto"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingHolidays;