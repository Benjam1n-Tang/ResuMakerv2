import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createExperience, deleteExperience, getExpereinceById, getUserExperiences, updateExperience } from "../controllers/experience.controller.js";

const experienceRouter = Router();

experienceRouter.post("/", authorize, createExperience);

experienceRouter.get("/user", authorize, getUserExperiences);

experienceRouter.get("/:id", authorize, getExpereinceById);

experienceRouter.put("/:id", authorize, updateExperience);

experienceRouter.delete("/:id", authorize, deleteExperience);

export default experienceRouter;
