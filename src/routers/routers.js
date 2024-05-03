import { Router } from "express";
import { loginRouter } from "./loginRouters.js";
import { servicesRouter } from "./servicesRouters.js";
import { formsRouter } from "./formsRouters.js";

const router = Router();

router
    .get("/health", (req, res) => res.send("TUDO CERTO"))
    .use("/login", loginRouter)
    .use("/services", servicesRouter)
    .use("/forms", formsRouter)

export default router;