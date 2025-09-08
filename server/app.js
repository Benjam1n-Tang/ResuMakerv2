import express from "express";
import cors from "cors";
import { PORT } from "./src/config/env.js";
import connectToDatabase from "./src/config/mongodb.js";

import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routes.js";
import socialRouter from "./src/routes/social.routes.js";
import resumeRouter from "./src/routes/resume.routes.js";
import letterRouter from "./src/routes/letter.routes.js";
import experienceRouter from "./src/routes/experience.routes.js";
import projectRouter from "./src/routes/project.routes.js";
import educationRouter from "./src/routes/education.route.js";
import certificateRouter from "./src/routes/certifcate.routes.js";
import skillRouter from "./src/routes/skill.routes.js";

import errorMiddleware from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://resu-maker-front.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/socials", socialRouter);
app.use("/api/v1/resumes", resumeRouter);
app.use("/api/v1/letters", letterRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/education", educationRouter);
app.use("/api/v1/certificates", certificateRouter);
app.use("/api/v1/skills", skillRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Benjamin API");
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`ResuMaker is running on http://localhost:${PORT}`);
  });
});

export default app;
