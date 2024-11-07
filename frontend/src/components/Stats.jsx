import React from 'react';
import { Calendar } from 'lucide-react';

const Stats = () => {
  const stats = [
    { 
      icon: <Calendar className="w-5 h-5 flex-row	" />,
  
      value: 'October',
      special: true // For special styling of the month box
    },
    { label: 'Present Days', value: '15' },
    { label: 'Total Leave Balance', value: '02' },
    { label: 'Outstanding Anomalies', value: '03' },
    { label: 'Avg. Working Hours', value: '9hrs 30min' },
  ];

  return (
    <div className="bg-white rounded-br-md rounded-bl-md">
      <div className="flex">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className={`flex-1 p-4 ${stat.special ? 'bg-white-50 rounded-md' : ''}`}>
              <div className="flex flex-col justify-center h-full">
                {stat.icon && (
                  <div className="flex items-center mb-1 text-gray-600">
                    {stat.icon}
                  </div>
                )}
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className={`${stat.special ? 'text-xl' : 'text-2xl'} font-semibold mt-1`}>
                  {stat.value}
                </p>
              </div>
            </div>
            {index < stats.length - 1 && (
              <div className="w-px bg-gray-200" /> 
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stats;