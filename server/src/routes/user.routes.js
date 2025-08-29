import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/me", authorize, getUser);

userRouter.post("/", (req, res) => res.send({ title: "CREATE a user" }));

userRouter.put("/me", (req, res) => res.send({ title: "UPDATE user" }));

userRouter.delete("/me", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
