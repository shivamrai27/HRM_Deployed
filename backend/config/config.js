import mongoose from 'mongoose';
export const connectDb = async ()=>{    
    try {
        const res = await mongoose.connect('mongodb+srv://shivam:shivam@cluster0.iufyx.mongodb.net/hrm?retryWrites=true&w=majority&appName=Cluster0');
        console.log('database is connected at port:', res.connection.port);
    } catch (error) {
        console.log('connection error', error);
    }
}