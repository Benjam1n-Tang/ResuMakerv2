import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/me", authorize, getUser);

userRouter.put("/me", authorize, updateUser);

userRouter.delete("/me", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
