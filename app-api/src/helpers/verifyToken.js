const jwt = require('jsonwebtoken');

const verifyToken = (token) => { 
    try {
        console.log("token verify:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Failed to verify token:", error);
        throw new Error("Failed to verify token");
    }
}

module.exports = verifyToken;