import jwt from "jsonwebtoken";

export const generateValidToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET);
}
