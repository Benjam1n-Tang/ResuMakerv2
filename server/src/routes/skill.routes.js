import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSkill, getUserSkill, updateSkill } from "../controllers/skill.controller.js";

const skillRouter = Router();

skillRouter.post("/", authorize, createSkill);

skillRouter.get("/", authorize, getUserSkill);

skillRouter.put("/:id", authorize, updateSkill);

export default skillRouter;
