import { Router } from "express";

const certificateRouter = Router();

certificateRouter.get("/", (req, res) =>
  res.send({ title: "GET all certificates" })
);

certificateRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user certificates" })
);

certificateRouter.get("/:id", (req, res) =>
  res.send({ title: "GET certificate details" })
);

certificateRouter.post("/", (req, res) =>
  res.send({ title: "CREATE certificate" })
);

certificateRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE certificate" })
);

certificateRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE certificate" })
);

export default certificateRouter;
