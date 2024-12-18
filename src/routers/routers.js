import { Router } from "express";
import { loginRouter } from "./loginRouters.js";
import { servicesRouter } from "./servicesRouters.js";
import { formsRouter } from "./formsRouters.js";
import backupDb from "../controllers/backup.js";
import apiChatbotRouter from "../chatbot-api.js";

const router = Router();

router
    .get("/health", (req, res) => res.send("TUDO CERTO"))
    .use("/login", loginRouter)
    .use("/api/v1", apiChatbotRouter)
    .use("/services", servicesRouter)
    .use("/forms", formsRouter)
    .get("/backup", backupDb);

export default router;