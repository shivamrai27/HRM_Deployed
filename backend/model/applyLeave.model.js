import mongoose from "mongoose";

const applyLeaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
  },
  type: {
    type: String, 
    enum: ['casual', 'sick', 'LOP'],
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  reason: {
    type: String,
  },
  days: {
    type: Number, // New property to store the calculated number of leave days
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Approved'
  }
}, { timestamps: true });

export const ApplyLeave = mongoose.model('ApplyLeave', applyLeaveSchema);


