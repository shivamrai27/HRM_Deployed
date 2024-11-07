// Logout controller
export const logoutEmployee = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('token', '', {
            expires: new Date(0), // Set expiration to past date to immediately expire
            httpOnly: true,
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error during logout",
            success: false
        });
    }
};

// Route (add this to your routes file)
router.post("/logout", isAuthenticated, logoutEmployee);