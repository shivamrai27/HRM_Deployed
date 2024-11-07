import { ApplyLeave } from "../model/applyLeave.model.js";
import { AvailableLeave } from "../model/availableLeave.model.js";
import { Employee } from "../model/Employee_model.js";

// Helper function to calculate number of days between two dates
const calculateLeaveDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include both start and end date
};

// Apply for leave controller
export const applyLeave = async (req, res) => {
  try {
    const { employee, type, start, end, reason } = req.body;
    console.log(`Receiving data from frontend: ${employee}`);

    // Calculate leave days
    const calculateLeaveDays = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeDiff = endDate - startDate;
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    };

    const leaveDays = calculateLeaveDays(start, end);

    // Fetch the available leave record for the employee
    const availableLeave = await AvailableLeave.findOne({ user: employee });

    if (!availableLeave) {
      return res.status(404).json({ message: 'Available leave record not found for this employee' });
    }

    // Check if there are enough leaves available for the requested type
    let availableLeaveCount;
    if (type === 'casual') {
      availableLeaveCount = availableLeave.casualLeave;
    } else if (type === 'sick') {
      availableLeaveCount = availableLeave.sickLeave;
    } else if (type === 'LOP') {
      availableLeaveCount = Infinity;
    }

    if (leaveDays > availableLeaveCount) {
      return res.status(400).json({ message: `Not enough ${type} leaves available. You have ${availableLeaveCount} ${type} leaves remaining.` });
    }

    // Create and save the leave application
    const newLeave = new ApplyLeave({
      employee,
      type,
      start,
      end,
      days: leaveDays,// Add calculated leave days
      reason,      
      status: 'Approved'
    });

    await newLeave.save();

    // Deduct the leaves from available leaves if the leave is approved
    if (type === 'casual') {
      availableLeave.casualLeave -= leaveDays;
    } else if (type === 'sick') {
      availableLeave.sickLeave -= leaveDays;
    }

    await availableLeave.save();

    res.status(200).json({ 
      message: 'Leave applied successfully', 
      newAvailableLeaves: {
        casualLeave: availableLeave.casualLeave,
        sickLeave: availableLeave.sickLeave,
        LOP: availableLeave.LOP
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get raming leave controller
export const getRemainingLeave = async (req, res) => {
  try {
    const { employeeId } = req.params; // Assuming the employee ID is passed as a URL parameter

    // Find the available leave record for the employee
    const availableLeave = await AvailableLeave.findOne({ user: employeeId });

    if (!availableLeave) {
      return res.status(404).json({ message: 'Available leave record not found for this employee' });
    }

    // Return the remaining leave data
    res.status(200).json({
      casualLeave: availableLeave.casualLeave,
      sickLeave: availableLeave.sickLeave,
      LOP: availableLeave.LOP
    });

  } catch (error) {
    console.error('Error fetching remaining leave:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//// Get leave
export const getLeaveApplications = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Find all leave applications for the specific employee
    const leaveApplications = await ApplyLeave.find({ employee: employeeId }).select(
      'type start end days reason status'
    );

    if (!leaveApplications || leaveApplications.length === 0) {
      return res.status(404).json({ message: 'No leave applications found for this employee.' });
    }

    res.status(200).json(leaveApplications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// module.exports = {
//   applyLeave
// };
