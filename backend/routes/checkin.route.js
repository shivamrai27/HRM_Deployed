import express from "express";
import { loginEmployee, registerEmployee } from "../controller/employee.controller.js";
import isAuthenticated from "../middleware/isAuthencticated.js"
const router = express.Router();
router.route("/checkin").post(isAuthenticated, registerEmployee);


export default router;