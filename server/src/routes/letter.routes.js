import { Router } from "express";

import upload from "../middlewares/multer.middleware.js";
import authorize from "../middlewares/auth.middleware.js";
import {
  createLetter,
  deleteLetter,
  getLetter,
  getUserLetter,
  getUserLetters,
} from "../controllers/letter.controller.js";

const letterRouter = Router();

letterRouter.get("/", authorize);
letterRouter.get("/user", authorize, getUserLetters); // must be before :id
letterRouter.get("/user/:id", authorize, getUserLetter);
letterRouter.get("/:id", getLetter);

letterRouter.post("/", authorize, upload.single("file"), createLetter);

letterRouter.delete("/:id", authorize, deleteLetter);

export default letterRouter;
