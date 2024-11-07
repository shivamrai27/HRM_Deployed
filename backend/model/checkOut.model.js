import mongoose from 'mongoose';

const CheckInSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },  // Reference to EmployeeModel
    checkOutTime: { type: Date, default: Date.now },  // Automatically set the check-in time
    location: {
        latitude: { type: String},
        longitude: { type: String}
    },
    photoUrl: { type: String, 
        // required: true 
    }  // You can store a URL or binary data, depending on how you handle the photo
},{timestamps:true});

export const CheckOut = mongoose.model("CheckOut", CheckInSchema);