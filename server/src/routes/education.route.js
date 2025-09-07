import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createEducation, deleteEducation, getEducationById, getUserEducation, updateEducation } from "../controllers/education.controller.js";

const educationRouter = Router();

educationRouter.post("/", authorize, createEducation);

educationRouter.get("/user", authorize, getUserEducation);

educationRouter.get("/:id", authorize, getEducationById);

educationRouter.put("/:id", authorize, updateEducation);

educationRouter.delete("/:id", authorize, deleteEducation);

export default educationRouter;
