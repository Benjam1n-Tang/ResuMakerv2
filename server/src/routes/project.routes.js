import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createProject, deleteProject, getProjectById, getUserProjects, updateProject } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.post("/", authorize, createProject);

projectRouter.get("/user", authorize, getUserProjects);

projectRouter.get("/:id", authorize, getProjectById);

projectRouter.put("/:id", authorize, updateProject);

projectRouter.delete("/:id", authorize, deleteProject);

export default projectRouter;
