import jwt from "jsonwebtoken";

export const JwtMiddleware = {
    async jwtTokenVerify(req, res, next){
        try {
            const authHeader = req.header("Authorization");
            
            if(!authHeader) return res.sendStatus(401);

            const token = authHeader.split(" ")[1];
            
            if(!token) return res.sendStatus(401);

            const tokenVerify = jwt.decode(token, process.env.JWT_SECRET);
            
            if(!tokenVerify) return res.sendStatus(401);

            return next();
        } catch (error) {
            console.log(error);
            return res.sendStatus(401);
        }
    }
}
