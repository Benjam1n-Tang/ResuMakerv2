import serverless from "serverless-http";
import app from "../app.js";   // your express app (without app.listen)

export default serverless(app);