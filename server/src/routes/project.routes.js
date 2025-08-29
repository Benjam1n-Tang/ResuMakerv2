import { Router } from "express";

const projectRouter = Router();

projectRouter.get("/", (req, res) =>
  res.send({ title: "GET all projects" })
);

projectRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user projects" })
);

projectRouter.get("/:id", (req, res) =>
  res.send({ title: "GET project details" })
);

projectRouter.post("/", (req, res) =>
  res.send({ title: "CREATE project" })
);

projectRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE project" })
);

projectRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE project" })
);

export default projectRouter;
