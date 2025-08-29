import { Router } from "express";

const experienceRouter = Router();

experienceRouter.get("/", (req, res) =>
  res.send({ title: "GET all experiences" })
);

experienceRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user experiences" })
);

experienceRouter.get("/:id", (req, res) =>
  res.send({ title: "GET experience details" })
);

experienceRouter.post("/", (req, res) =>
  res.send({ title: "CREATE experience" })
);

experienceRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE experience" })
);

experienceRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE experience" })
);

export default experienceRouter;
