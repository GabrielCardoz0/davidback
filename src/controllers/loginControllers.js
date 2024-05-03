import jwt from "jsonwebtoken";
import { generateValidToken } from "../utils.js";
import { LoginModels } from "../models/loginModels.js";

    export const LoginControllers = {
    async login(req, res){
        try {
            const { login, password } = req.body;

            if(!login || login === "") throw { status: 400, message: "Campo 'login' vazio ou não enviado." };

            if(!password || password === "") throw { status: 400, message: "Campo 'password' vazio ou não enviado." };

            if(login !== process.env.LOGIN) throw { status: 401, message: "Login errado." };

            if(password !== process.env.PASSWORD) throw { status: 401, message: "Senha errada." };

            const token = generateValidToken({ type: 'admin' });

            const user = await LoginModels.getAdminUser();

            return res.send({ token, user });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "");
        }
    },

    async checkToken(req, res){
        try {
            const {token} = req.params;

            const tokenVerify = jwt.decode(token, process.env.JWT_SECRET);
            
            if(!tokenVerify) return res.sendStatus(401);

            return res.send("OK");

        } catch (error) {
            console.log(error);
            return res.status(401);
        }
    }
}
