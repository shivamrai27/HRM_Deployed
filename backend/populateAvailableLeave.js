import mongoose from "mongoose";
import { Employee } from "./model/Employee_model.js"; 
import { AvailableLeave } from "./model/availableLeave.model.js"; 

// Connect to your MongoDB database
export const connectDb = async ()=>{    
    try {
        const res = await mongoose.connect('mongodb+srv://shivam:shivam@cluster0.iufyx.mongodb.net/hrm?retryWrites=true&w=majority&appName=Cluster0');
        console.log('database is connected at port:', res.connection.port);
    } catch (error) {
        console.log('connection error', error);
    }
}

const populateAvailableLeave = async () => {
  try {
    // Fetch all users (employees) from the User collection
    const employees = await Employee.find(); 

    if (employees.length === 0) {
      console.log('No users found.');
      return;
    }

    // Loop through each user and create an AvailableLeave record for them
    for (const employee of employees) {
      
      const newAvailableLeave = new AvailableLeave({
        user: employee._id, 
        casualLeave: 12,  
        sickLeave: 10,    
        LOP: 6           
      });

      // Save the available leave record to the database
      await newAvailableLeave.save();
      console.log(`Available leave created for ${employee.name} (${employee.email})`);
    }

    console.log('AvailableLeave data population completed.');
    process.exit(0); // Exit the script after completion
  } catch (error) {
    console.error('Error populating available leave:', error);
    process.exit(1);
  }
};
connectDb();
populateAvailableLeave();
