// //Checkout controller

// app.post("/checkout", async(req, res) => {
//     try {
//       const { userId } = req.body;  // Extracting userId from request body
  
//       // Ensure userId exists
//       const employee = await Employee.findById(userId);
//       if (!employee) {
//           return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Find the most recent check-in record
//       const lastCheckIn = await CheckIn.findOne({ employee: userId }).sort({ createdAt: -1 });
  
//       // If no check-in record exists, return an error
//       if (!lastCheckIn) {
//           return res.status(404).json({ message: 'No check-in record found' });
//       }
  
//       // Calculate the duration of the check-in
//       const duration = Math.floor((Date.now() - lastCheckIn.createdAt) / 1000);
  
//       // Return the duration