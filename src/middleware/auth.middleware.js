const { verifyToken } = require("../config/jwt.config");

const authMiddleware = (req, res, next) => {
    try {
        // Extract token from header
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = verifyToken(token);

        // Attach user data to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;
