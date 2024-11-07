import mongoose from "mongoose";

const availableLeaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    // required: true
  },
  casualLeave: {
    type: Number,
    default: 12, 
    // required: true
  },
  sickLeave: {
    type: Number,
    default: 10, 
    // required: true
  },
  LOP: {
    type: Number,
    default: 6, 
    // required: true
  }
},{timestamps:true});

export const AvailableLeave = mongoose.model('AvailableLeave', availableLeaveSchema);
