import express from 'express';
const router = express.Router();
import { applyLeave, getRemainingLeave, getLeaveApplications } from '../controller/leave.controller.js';
import isAuthenticated from "../middleware/isAuthencticated.js"

// Apply leave route
router.route('/applyLeave').post( applyLeave);
router.route('/remaining/:employeeId').get( getRemainingLeave);
router.get('/getLeaveApplications/:employeeId', getLeaveApplications);

export default router;