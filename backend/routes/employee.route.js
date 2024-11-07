import express from "express";
import { loginEmployee, registerEmployee } from "../controller/employee.controller.js";

const router = express.Router();
router.route("/register").post(registerEmployee);
router.route("/login").post(loginEmployee);

export default router;