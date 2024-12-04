import { Router } from "express";
import { ServicesControllers } from "../controllers/servicesControllers.js";

export const servicesRouter = Router();

servicesRouter
    .post("/", ServicesControllers.createService)
    .get("/", ServicesControllers.getServices)
    .delete("/:serviceId", ServicesControllers.deleteService)
    .put("/:serviceId", ServicesControllers.updateService);