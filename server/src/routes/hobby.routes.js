import { Router } from "express";

const hobbyRouter = Router();

hobbyRouter.get("/", (req, res) =>
  res.send({ title: "GET all hobbies" })
);

hobbyRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user hobbies" })
);

hobbyRouter.get("/:id", (req, res) =>
  res.send({ title: "GET hobby details" })
);

hobbyRouter.post("/", (req, res) =>
  res.send({ title: "CREATE hobby" })
);

hobbyRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE hobby" })
);

hobbyRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE hobby" })
);

export default hobbyRouter;
