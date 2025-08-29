import { Router } from "express";

const skillRouter = Router();

skillRouter.get("/", (req, res) =>
  res.send({ title: "GET all skills" })
);

skillRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user skills" })
);

skillRouter.get("/:id", (req, res) =>
  res.send({ title: "GET resume skills" })
);

skillRouter.post("/", (req, res) =>
  res.send({ title: "CREATE skill" })
);

skillRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE skill" })
);

skillRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE skill" })
);

export default skillRouter;
