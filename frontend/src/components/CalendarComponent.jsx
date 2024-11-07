// import React, { useState } from 'react';
// import { Calendar } from "@/components/ui/calendar";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const CalendarComponent = () => {
//   const [date, setDate] = useState(new Date());

//   return (
//     <div className="bg-white rounded-lg shadow p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">August 2024</h2>
//         <div className="flex gap-2">
//           <button className="p-2 hover:bg-gray-100 rounded-full">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <button className="p-2 hover:bg-gray-100 rounded-full">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
      
//       <Calendar
//         mode="single"
//         selected={date}
//         onSelect={setDate}
//         className="rounded-md"
//         disabled={(date) =>
//           date > new Date() || date < new Date("1900-01-01")
//         }
//         modifiers={{
//           selected: date,
//           highlighted: new Date(2024, 7, 22)
//         }}
//         modifiersClassNames={{
//           selected: "bg-blue-500 text-white hover:bg-blue-500",
//           highlighted: "bg-gray-200"
//         }}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;