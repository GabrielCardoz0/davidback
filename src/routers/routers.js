import { Router } from "express";
import { loginRouter } from "./loginRouters.js";
import { servicesRouter } from "./servicesRouters.js";
import { formsRouter } from "./formsRouters.js";
import backupDb from "../controllers/backup.js";
<<<<<<< HEAD
=======
import apiChatbotRouter from "../chatbot-api.js";
>>>>>>> 738560f863fc330f36e3784a170ee056f866d314

const router = Router();

router
    .get("/health", (req, res) => res.send("TUDO CERTO"))
    .use("/login", loginRouter)
<<<<<<< HEAD
=======
    .use("/api/v1", apiChatbotRouter)
>>>>>>> 738560f863fc330f36e3784a170ee056f866d314
    .use("/services", servicesRouter)
    .use("/forms", formsRouter)
    .get("/backup", backupDb);

export default router;