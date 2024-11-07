import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify token and handle potential errors
        let decode;
        try {
            decode = jwt.verify(token, process.env.SECRET_KEY);
        } catch (tokenError) {
            if (tokenError instanceof jwt.TokenExpiredError) {
                return res.status(401).json({
                    message: "Token has expired",
                    success: false
                });
            }
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        if (!decode || !decode.userId) {
            return res.status(401).json({
                message: "Invalid token payload",
                success: false
            });
        }

        // Store decoded information in request
        req.user = {
            id: decode.userId,
            // Add any other user information from token if needed
        };

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Internal server error during authentication",
            success: false
        });
    }
};

export default isAuthenticated;