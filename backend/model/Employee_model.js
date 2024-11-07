import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        // required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','employee'],
        // required:true
    },

},
{timestamps:true});

export const Employee = mongoose.model("Employee", employeeSchema);
