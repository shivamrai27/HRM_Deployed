import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent'], default: 'absent' },
    checkIn: {
        time: {type: Date},
        location: {
            latitude: Number,
            longitude: Number
        },
        photoUrl: String
    },
    checkOut: {
        time: {type: Date,  default: null},
        location: {
            latitude: Number,
            longitude: Number
        },
        photoUrl: String
    },
    duration: { type: Number, default: 0 } // Duration in milliseconds
});

export const Attendance = mongoose.model('Attendance', attendanceSchema);
