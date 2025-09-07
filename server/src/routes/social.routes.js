import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSocial,
  deleteSocial,
  getSocialById,
  getUserSocials,
  updateSocial,
} from "../controllers/social.controller.js";

const socialRouter = Router();

socialRouter.post("/", authorize, createSocial);

socialRouter.get("/user", authorize, getUserSocials);

socialRouter.get("/:id", authorize, getSocialById);

socialRouter.put("/:id", authorize, updateSocial);

socialRouter.delete("/:id", authorize, deleteSocial);

export default socialRouter;
