import express from "express";
import { connectDb } from "./config/config.js";
import cors from "cors";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import helmet from "helmet"
import cookieParser from 'cookie-parser';
import { Employee } from "./model/Employee_model.js";
import employeeRoute from "./routes/employee.route.js"
import leaveroute from "./routes/applyLeave.route.js"
import { CheckIn } from "./model/checkInModel.js";
import { CheckOut } from "./model/checkOut.model.js";
import { Attendance } from "./model/attendance.model.js";
import isAuthenticated from "./middleware/isAuthencticated.js"
// import { applyLeave } from "./controller/applyLeave.js";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser()); // To parse cookies
// Step 1: Define allowed origins
const allowedOrigins = [
  'http://localhost:3000', 

  'https://hrm-deployed-selt.vercel.app'
];

// Step 2: Set up CORS with options and preflight handling
app.use(cors({
  origin: 'https://hrm-deployed-selt.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Step 3: Handle OPTIONS requests for preflight
app.options('*', cors()); // This allows the server to respond to preflight requests

// Step 4: Additional headers setup (optional, for more control over all responses)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

connectDb();

app.get("/", (req, res) => {
  res.send("hello");
});

// Employee routes
app.use('/employee', employeeRoute)

//Leave routes
app.use('/leave', leaveroute);

app.post("/checkin", isAuthenticated, async (req, res) => {
    try {
        const { photoUrl, location } = req.body;
        const employeeId = req.user.id;
        const date = new Date().toISOString().split('T')[0]; // Standardized date format

        // Validate required fields
        if (!location || !location.latitude || !location.longitude || !photoUrl) {
            return res.status(400).json({
                message: 'Missing required check-in information',
                success: false
            });
        }

        // Create a new attendance record regardless of existing ones
        const attendance = new Attendance({
            employeeId,
            date,
            status: 'present',
            checkIn: {
                time: Date.now(),
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude
                },
                photoUrl: photoUrl
            }
        });

        await attendance.save();

        return res.status(201).json({
            message: 'Check-in successful',
            success: true,
            data: attendance
        });
    } catch (error) {
        console.error("Check-in error:", error);
        return res.status(500).json({
            message: 'Server error during check-in',
            success: false
        });
    }
});



// Checkout controller
app.post("/checkout", isAuthenticated, async (req, res) => {
    try {
        const { photoUrl, location } = req.body;
        const employeeId = req.user.id;
        const date = new Date().toISOString().split('T')[0]; // Standardized date format

        // Validate required fields
        if (!location || !location.latitude || !location.longitude || !photoUrl) {
            return res.status(400).json({
                message: 'Missing required check-out information',
                success: false
            });
        }

        // Find the latest attendance record for today by sorting in descending order of check-in time
        let attendance = await Attendance.findOne({ 
            employeeId, 
            date 
        }).sort({ "checkIn.time": -1 }); // Sort by check-in time in descending order

        // Check if we have a valid attendance record and it doesn't already have a check-out time
        if (!attendance || attendance.checkOut?.time) {
            return res.status(400).json({
                message: 'Check-in required before check-out or check-out already completed',
                success: false
            });
        }

        // Update the check-out information
        attendance.checkOut = {
            time: Date.now(),
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            photoUrl: photoUrl
        };

        // Calculate duration in milliseconds
        attendance.duration = new Date(attendance.checkOut.time) - new Date(attendance.checkIn.time);

        await attendance.save();

        return res.status(201).json({
            message: 'Check-out successful',
            success: true,
            data: attendance
        });
    } catch (error) {
        console.error("Check-out error:", error);
        return res.status(500).json({
            message: 'Server error during check-out',
            success: false
        });
    }
});



// Attendance GET Endpoint
app.get("/attendance", isAuthenticated, async (req, res) => {
    try {
      const employeeId = req.user.id;
      const limit = parseInt(req.query.limit) || 10; // Default to 10 records per request
      const skip = parseInt(req.query.skip) || 0; // Default to 0 for the first request
  
      const attendanceRecords = await Attendance.find({ employeeId })
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit);
  
      const formattedRecords = attendanceRecords.map((record) => ({
        date: record.date.toISOString().split("T")[0],
        status: record.status,
        checkIn: record.checkIn.time
          ? new Date(record.checkIn.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A",
        checkOut: record.checkOut.time
          ? new Date(record.checkOut.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A",
        duration: record.duration
          ? `${Math.floor(record.duration / 3600000)}h ${Math.floor(
              (record.duration % 3600000) / 60000
            )}m`
          : "N/A",
      }));
  
      const totalRecords = await Attendance.countDocuments({ employeeId });
  
      return res.status(200).json({
        message: "Attendance records retrieved successfully",
        success: true,
        data: formattedRecords,
        totalRecords,
      });
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      return res.status(500).json({
        message: "Internal server error while fetching attendance records",
        success: false,
      });
    }
  });



app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
