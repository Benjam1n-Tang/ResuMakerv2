import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createCertificate, deleteCertificate, getCertificateById, getUserCertificates, updateCertificate } from "../controllers/certificate.controller.js";

const certificateRouter = Router();

certificateRouter.post("/", authorize, createCertificate);

certificateRouter.get("/user", authorize, getUserCertificates);

certificateRouter.get("/:id", authorize, getCertificateById);

certificateRouter.put("/:id", authorize, updateCertificate);

certificateRouter.delete("/:id", authorize, deleteCertificate);

export default certificateRouter;
