import { Router } from "express";
import { FormsControllers } from "../controllers/formsControllers.js";

export const formsRouter = Router();

formsRouter
    .post("/", FormsControllers.createForm)
    .get("/", FormsControllers.getForms)
    .delete("/:formId", FormsControllers.deleteForm)
    
    .get("/public/:identify", FormsControllers.getFormServicesByUuid)
    .post("/public/:identify/plans", FormsControllers.createColabPlan)
    
    
    .get("/colaborators", FormsControllers.getColaborators)
    .delete("/colaborators/:id", FormsControllers.deleteColaborators)

    .get("/colaborators/new", FormsControllers.getNewColaborators)
    .put("/colaborators/new/:id", FormsControllers.confirmedColaborator)
    .delete("/colaborators/new/:id", FormsControllers.deniedColaborator)