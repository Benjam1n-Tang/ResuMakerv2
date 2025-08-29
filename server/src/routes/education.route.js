import { Router } from "express";

const educationRouter = Router();

educationRouter.get("/", (req, res) =>
  res.send({ title: "GET all education" })
);

educationRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user education" })
);

educationRouter.get("/:id", (req, res) =>
  res.send({ title: "GET education details" })
);

educationRouter.post("/", (req, res) =>
  res.send({ title: "CREATE education" })
);

educationRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE education" })
);

educationRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE education" })
);

export default educationRouter;
