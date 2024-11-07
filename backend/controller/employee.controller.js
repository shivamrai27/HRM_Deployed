import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Employee } from "../model/Employee_model.js";
export const registerEmployee = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if any field is missing
      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
  
      // Check if user already exists
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new employee
      await Employee.create({
        name,
        email,
        password: hashedPassword,
      });
  
      return res.status(201).json({
        message: "Account created successfully.",
        success: true,
      });
    } catch (err) {
      // Handle errors properly
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
        success: false,
      });
    }
  }
  
  export const loginEmployee = async (req, res) => {
    
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
      let user = await Employee.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      } 
  
      const tokenData = {
        userId: user._id,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
  
      user = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
  
      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpsOnly: true,
          sameSite: "strict",
        })
        .json({
          message: `Welcome back ${user.name}`,
          user,
          success: true,
        });
    } catch (error) {
      console.log(error);
    }
  };