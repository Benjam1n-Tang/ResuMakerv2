import { Router } from "express";
import { createResume, deleteResume, getResume, getUserResume, getUserResumes } from "../controllers/resume.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authorize from "../middlewares/auth.middleware.js";

const resumeRouter = Router();

resumeRouter.get("/", authorize);

resumeRouter.get("/user", authorize, getUserResumes)

resumeRouter.get("/:id", getResume);

resumeRouter.get("/user/:id", authorize, getUserResume)

resumeRouter.post("/", authorize, upload.single("file"), createResume);

resumeRouter.delete("/:id", authorize, deleteResume);

export default resumeRouter;
